export const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400",
};

export function json(
  data: unknown,
  status = 200,
  extraHeaders: Record<string, string> = {}
): Response {
  const body = JSON.stringify(data);
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "application/json",
      ...CORS_HEADERS,
      ...extraHeaders,
    },
  });
}

export function ok(data: unknown, extraHeaders?: Record<string, string>): Response {
  return json(data, 200, extraHeaders);
}

export function created(data: unknown, extraHeaders?: Record<string, string>): Response {
  return json(data, 201, extraHeaders);
}

export function noContent(extraHeaders?: Record<string, string>): Response {
  return new Response(null, { status: 204, headers: { ...CORS_HEADERS, ...extraHeaders } });
}

export function badRequest(message = "Bad request", details?: unknown): Response {
  return json({ error: message, ...(details !== undefined ? { details } : {}) }, 400);
}

export function unauthorized(message = "Unauthorized"): Response {
  return json({ error: message }, 401);
}

export function forbidden(message = "Forbidden"): Response {
  return json({ error: message }, 403);
}

export function notFound(message = "Not found"): Response {
  return json({ error: message }, 404);
}

export function conflict(message = "Conflict"): Response {
  return json({ error: message }, 409);
}

export function serverError(message = "Internal server error"): Response {
  return json({ error: message }, 500);
}