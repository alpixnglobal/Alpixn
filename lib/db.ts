import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI environment variable.");
}

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  unavailableUntil: number;
};

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cache = global.mongooseCache ?? { conn: null, promise: null, unavailableUntil: 0 };

global.mongooseCache = cache;

export async function connectToDatabase() {
  const mongoUri = MONGODB_URI;

  if (!mongoUri) {
    throw new Error("Missing MONGODB_URI environment variable.");
  }

  if (cache.conn) {
    return cache.conn;
  }

  if (cache.unavailableUntil > Date.now()) {
    throw new Error("MongoDB connection temporarily unavailable.");
  }

  if (!cache.promise) {
    cache.promise = mongoose
      .connect(mongoUri, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000,
        socketTimeoutMS: 10000,
      })
      .then((connection) => {
        cache.unavailableUntil = 0;
        return connection;
      })
      .catch((error) => {
        cache.promise = null;
        cache.unavailableUntil = Date.now() + 60_000;
        throw error;
      });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
