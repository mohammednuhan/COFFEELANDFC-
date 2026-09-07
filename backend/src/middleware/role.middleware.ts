/**
 * Authorization middleware — restricts a route to specific roles.
 * Must run after `requireAuth`.
 */
export const requireRoles =
  (...roles: string[]) =>
  async (ctx, next) => {
    if (!ctx.user) {
      return new Response(JSON.stringify({ error: "Authentication required" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (!roles.includes(ctx.user.role)) {
      return new Response(JSON.stringify({ error: "Forbidden: insufficient permissions" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }
    return next();
  };