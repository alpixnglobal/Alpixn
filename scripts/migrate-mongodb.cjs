#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const { MongoClient } = mongoose.mongo;

const DEFAULT_BATCH_SIZE = 500;
const ENV_FILES = [".env.local", ".env"];

loadEnvFiles();

const args = parseArgs(process.argv.slice(2));

if (args.help) {
  printHelp();
  process.exit(0);
}

const sourceUri = args["source-uri"] || process.env.SOURCE_MONGODB_URI || process.env.MONGODB_URI;
const targetUri = args["target-uri"] || process.env.TARGET_MONGODB_URI;
const requestedSourceDbName = args["source-db"] || process.env.SOURCE_DB_NAME || getDbNameFromUri(sourceUri);
const requestedTargetDbName =
  args["target-db"] || process.env.TARGET_DB_NAME || getDbNameFromUri(targetUri) || requestedSourceDbName;
const batchSize = getBatchSize(args["batch-size"] || process.env.MIGRATION_BATCH_SIZE);
const dropTarget = getBooleanFlag(args["drop-target"], process.env.DROP_TARGET);

if (!sourceUri) {
  fail("Missing source MongoDB URI. Set MONGODB_URI or SOURCE_MONGODB_URI.");
}

if (!targetUri) {
  fail("Missing target MongoDB URI. Set TARGET_MONGODB_URI.");
}

async function main() {
  const sourceClient = new MongoClient(sourceUri);
  const targetClient = new MongoClient(targetUri);

  try {
    await sourceClient.connect();
    await targetClient.connect();

    const sourceDbName = requestedSourceDbName || sourceClient.db().databaseName;
    const targetDbName = requestedTargetDbName || targetClient.db().databaseName || sourceDbName;

    if (!sourceDbName) {
      fail("Could not determine source database name. Set SOURCE_DB_NAME or use a URI with /dbName.");
    }

    if (!targetDbName) {
      fail("Could not determine target database name. Set TARGET_DB_NAME or use a URI with /dbName.");
    }

    if (sourceUri === targetUri && sourceDbName === targetDbName) {
      fail("Source and target point to the same database. Aborting.");
    }

    const sourceDb = sourceClient.db(sourceDbName);
    const targetDb = targetClient.db(targetDbName);
    const sourceCollections = await sourceDb.listCollections({}, { nameOnly: false }).toArray();

    if (!sourceCollections.length) {
      console.log(`No collections found in source database "${sourceDbName}".`);
      return;
    }

    console.log(`Source database: ${sourceDbName}`);
    console.log(`Target database: ${targetDbName}`);
    console.log(`Collections to copy: ${sourceCollections.length}`);
    console.log(`Drop target first: ${dropTarget ? "yes" : "no"}`);

    for (const collectionInfo of sourceCollections) {
      if (collectionInfo.type !== "collection") {
        console.log(`Skipping non-collection "${collectionInfo.name}" (${collectionInfo.type}).`);
        continue;
      }

      await copyCollection({
        sourceDb,
        targetDb,
        collectionInfo,
        batchSize,
        dropTarget,
      });
    }

    console.log("Migration finished successfully.");
  } finally {
    await Promise.allSettled([sourceClient.close(), targetClient.close()]);
  }
}

async function copyCollection({ sourceDb, targetDb, collectionInfo, batchSize, dropTarget }) {
  const name = collectionInfo.name;
  const sourceCollection = sourceDb.collection(name);
  const targetCollection = targetDb.collection(name);
  const sourceCount = await sourceCollection.countDocuments();
  const targetExists = (await targetDb.listCollections({ name }).toArray()).length > 0;

  console.log(`\nCopying "${name}" (${sourceCount} documents)`);

  if (targetExists && dropTarget) {
    await targetCollection.drop();
  }

  if (!targetExists || dropTarget) {
    const options = sanitizeCollectionOptions(collectionInfo.options);
    await targetDb.createCollection(name, options);
  }

  const existingTargetCount = (await targetDb.listCollections({ name }).toArray()).length
    ? await targetCollection.countDocuments()
    : 0;

  if (existingTargetCount > 0 && !dropTarget) {
    fail(
      `Target collection "${name}" already has ${existingTargetCount} documents. ` +
        `Re-run with DROP_TARGET=true or --drop-target=true to overwrite it.`
    );
  }

  let buffer = [];
  let inserted = 0;

  for await (const document of sourceCollection.find({}, { batchSize })) {
    buffer.push(document);

    if (buffer.length >= batchSize) {
      await targetCollection.insertMany(buffer, { ordered: true });
      inserted += buffer.length;
      buffer = [];
      console.log(`  Inserted ${inserted}/${sourceCount}`);
    }
  }

  if (buffer.length > 0) {
    await targetCollection.insertMany(buffer, { ordered: true });
    inserted += buffer.length;
    console.log(`  Inserted ${inserted}/${sourceCount}`);
  }

  await syncIndexes(sourceCollection, targetCollection);
}

async function syncIndexes(sourceCollection, targetCollection) {
  const indexes = await sourceCollection.indexes();
  const indexesToCreate = indexes
    .filter((index) => index.name !== "_id_")
    .map((index) => {
      const { key, name, ns, v, ...options } = index;
      return { key, name, ...options };
    });

  if (!indexesToCreate.length) {
    return;
  }

  await targetCollection.createIndexes(indexesToCreate);
  console.log(`  Synced ${indexesToCreate.length} indexes`);
}

function sanitizeCollectionOptions(options = {}) {
  const allowedKeys = [
    "capped",
    "size",
    "max",
    "validator",
    "validationLevel",
    "validationAction",
    "collation",
    "timeseries",
    "expireAfterSeconds",
    "changeStreamPreAndPostImages",
    "clusteredIndex",
  ];

  return Object.fromEntries(
    allowedKeys
      .filter((key) => key in options && options[key] !== undefined)
      .map((key) => [key, options[key]])
  );
}

function loadEnvFiles() {
  for (const fileName of ENV_FILES) {
    const filePath = path.join(process.cwd(), fileName);

    if (!fs.existsSync(filePath)) {
      continue;
    }

    const content = fs.readFileSync(filePath, "utf8");

    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }

      const separatorIndex = trimmed.indexOf("=");

      if (separatorIndex === -1) {
        continue;
      }

      const key = trimmed.slice(0, separatorIndex).trim();
      let value = trimmed.slice(separatorIndex + 1).trim();

      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      if (!(key in process.env)) {
        process.env[key] = value;
      }
    }
  }
}

function parseArgs(rawArgs) {
  return rawArgs.reduce((accumulator, item) => {
    if (!item.startsWith("--")) {
      return accumulator;
    }

    const [rawKey, rawValue] = item.slice(2).split("=", 2);
    accumulator[rawKey] = rawValue === undefined ? "true" : rawValue;
    return accumulator;
  }, {});
}

function getDbNameFromUri(uri) {
  if (!uri) {
    return null;
  }

  const match = uri.match(/^mongodb(?:\+srv)?:\/\/[^/]+\/([^?]+)/i);
  return match && match[1] ? decodeURIComponent(match[1]) : null;
}

function getBatchSize(rawValue) {
  if (!rawValue) {
    return DEFAULT_BATCH_SIZE;
  }

  const numericValue = Number(rawValue);
  return Number.isInteger(numericValue) && numericValue > 0 ? numericValue : DEFAULT_BATCH_SIZE;
}

function getBooleanFlag(argumentValue, envValue) {
  const value = argumentValue ?? envValue;
  return typeof value === "string" && value.toLowerCase() === "true";
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

function printHelp() {
  console.log(`
Copy one MongoDB database into another.

Environment variables:
  MONGODB_URI or SOURCE_MONGODB_URI   Source MongoDB URI
  TARGET_MONGODB_URI                  Target MongoDB URI
  SOURCE_DB_NAME                      Optional source DB name override
  TARGET_DB_NAME                      Optional target DB name override
  DROP_TARGET=true                    Drop target collections before copy
  MIGRATION_BATCH_SIZE=500            Batch size for inserts

CLI flags:
  --source-uri=...
  --target-uri=...
  --source-db=...
  --target-db=...
  --drop-target=true
  --batch-size=500
  --help
`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
