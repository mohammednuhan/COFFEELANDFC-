import type { Middleware } from "../types";
import { verifyToken } from "../utils/jwt";
import { unauthorized } from "../utils/response";

/**
 * Authentication middleware — prevents access to protected routes unless a valid
 * `Authorization: Bearer <token>` header is present.
 */
export const requireAuth: Middleware = async (ctx, next) => {
  const header = ctx.req.headers.get("Authorization");
  if (!header || !header.startsWith("Bearer ")) {
    return unauthorized("Authentication required");
  }

  const token = header.slice("Bearer ".length).trim();
  const payload = await verifyToken(token);

  if (!payload) {
    return unauthorized("Invalid or expired token");
  }

  ctx.user = {
    id: Number(payload.sub),
    username: payload.username,
    email: payload.email,
    role: payload.role,
  };

  return next();
};