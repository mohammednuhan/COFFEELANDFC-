import { CORS_HEADERS, json } from "../utils/response";
import { AppError } from "../utils/errors";

/**
 * CORS handling. Returns a preflight (OPTIONS) response immediately.
 * For other requests, CORS headers are applied to every response via
 * the `json()` helper in utils/response.ts.
 */
export function handleCors(req: Request): Response | null {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }
  return null;
}

/**
 * Central error handler — converts thrown errors into JSON responses.
 */
export function handleError(error: unknown): Response {
  if (error instanceof AppError) {
    return json({ error: error.message, ...(error.details !== undefined ? { details: error.details } : {}) }, error.status);
  }

  if (error instanceof SyntaxError) {
    return json({ error: "Invalid JSON body" }, 400);
  }

  if (error instanceof Error) {
    console.error("Unhandled error:", error);
    return json({ error: "Internal server error" }, 500);
  }

  return json({ error: "Internal server error" }, 500);
}

/**
 * Simple request logger middleware.
 */
export function logger(next: () => Promise<Response>, req: Request): Promise<Response> {
  const start = performance.now();
  return next().then((res) => {
    const ms = (performance.now() - start).toFixed(1);
    console.log(`${new Date().toISOString()} ${req.method} ${new URL(req.url).pathname} ${res.status} (${ms}ms)`);
    return res;
  });
}