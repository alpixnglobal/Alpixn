import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";
import { resolveApiKey, type AiProvider } from "./settings";

export class AiProviderError extends Error {}

type StructuredRequest<T extends z.ZodType> = {
  system: string;
  prompt: string;
  schema: T;
  /** Name used for the JSON schema on providers that need one. */
  name?: string;
};

/** Pulls the first JSON object out of a model reply (handles ```json fences). */
function extractJson(text: string) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = fenced ? fenced[1] : text;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0 || end < start) throw new AiProviderError("The AI reply did not contain JSON.");
  return JSON.parse(raw.slice(start, end + 1));
}

function validate<T extends z.ZodType>(schema: T, value: unknown): z.infer<T> {
  const parsed = schema.safeParse(value);
  if (!parsed.success) throw new AiProviderError(`The AI reply did not match the expected format: ${parsed.error.issues.slice(0, 3).map((i) => `${i.path.join(".")} ${i.message}`).join("; ")}`);
  return parsed.data;
}

/* ---------- Claude (official Anthropic SDK, structured outputs) ---------- */
async function claude<T extends z.ZodType>(p: AiProvider, apiKey: string, req: StructuredRequest<T>): Promise<z.infer<T>> {
  const client = new Anthropic({ apiKey, timeout: 9 * 60 * 1000 });
  try {
    const message = await client.beta.messages.parse({
      model: p.model || "claude-opus-5-5",
      max_tokens: 16000,
      // Server-side refusal fallback: if the model declines, Anthropic re-runs the request on a recommended fallback model.
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: "medium", format: betaZodOutputFormat(req.schema) },
      system: req.system,
      messages: [{ role: "user", content: req.prompt }],
    });
    if (message.stop_reason === "refusal") throw new AiProviderError("Claude declined this request. Try a different topic.");
    if (message.stop_reason === "max_tokens") throw new AiProviderError("The reply was cut off (max tokens). Try a shorter target length.");
    if (!message.parsed_output) throw new AiProviderError("Claude's reply could not be parsed.");
    return validate(req.schema, message.parsed_output);
  } catch (error) {
    if (error instanceof AiProviderError) throw error;
    if (error instanceof Anthropic.AuthenticationError) throw new AiProviderError("Claude API key is invalid.");
    if (error instanceof Anthropic.RateLimitError) throw new AiProviderError("Claude rate limit reached — try again later.");
    if (error instanceof Anthropic.APIError) throw new AiProviderError(`Claude API error ${error.status}: ${error.message}`);
    throw error;
  }
}

/* ---------- OpenAI and OpenAI-compatible (Chat Completions, JSON mode) ---------- */
async function openai<T extends z.ZodType>(p: AiProvider, apiKey: string, req: StructuredRequest<T>): Promise<z.infer<T>> {
  const base = (p.type === "openai-compatible" ? p.baseUrl : "https://api.openai.com/v1").replace(/\/$/, "");
  if (!base.startsWith("https://")) throw new AiProviderError("The provider base URL must start with https://");
  const res = await fetch(`${base}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: p.model,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: `${req.system}\n\nReply with a single JSON object matching this JSON Schema:\n${JSON.stringify(z.toJSONSchema(req.schema))}` },
        { role: "user", content: req.prompt },
      ],
    }),
    signal: AbortSignal.timeout(9 * 60 * 1000),
  });
  if (!res.ok) throw new AiProviderError(`${p.label} API error ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  return validate(req.schema, extractJson(data.choices?.[0]?.message?.content ?? ""));
}

/* ---------- Google Gemini (generateContent, JSON response) ---------- */
async function gemini<T extends z.ZodType>(p: AiProvider, apiKey: string, req: StructuredRequest<T>): Promise<z.infer<T>> {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(p.model)}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: `${req.system}\n\nReply with a single JSON object matching this JSON Schema:\n${JSON.stringify(z.toJSONSchema(req.schema))}` }] },
      contents: [{ role: "user", parts: [{ text: req.prompt }] }],
      generationConfig: { responseMimeType: "application/json" },
    }),
    signal: AbortSignal.timeout(9 * 60 * 1000),
  });
  if (!res.ok) throw new AiProviderError(`Gemini API error ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = (await res.json()) as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
  return validate(req.schema, extractJson(data.candidates?.[0]?.content?.parts?.map((x) => x.text ?? "").join("") ?? ""));
}

/** Runs a structured (JSON) generation on any configured provider. */
export async function generateStructured<T extends z.ZodType>(provider: AiProvider, req: StructuredRequest<T>): Promise<z.infer<T>> {
  const apiKey = resolveApiKey(provider);
  if (!apiKey) throw new AiProviderError(`No API key for ${provider.label}. Add it in AI Studio or as an environment variable.`);
  if (provider.type === "anthropic") return claude(provider, apiKey, req);
  if (provider.type === "gemini") return gemini(provider, apiKey, req);
  return openai(provider, apiKey, req);
}

/** A tiny request to check that the key and model work. */
export async function testProvider(provider: AiProvider) {
  const out = await generateStructured(provider, {
    system: "You are a connection test.",
    prompt: 'Reply with {"ok": true}.',
    schema: z.object({ ok: z.boolean() }),
  });
  return out.ok;
}
