import { env } from "./config/env";
import { handleCors, handleError, logger } from "./middleware/cors.middleware";
import { routes } from "./routes";
import type { HttpMethod, Middleware, Route, RouteContext } from "./types";
import { notFound } from "./utils/response";

function matchPath(pattern: string, pathname: string): Record<string, string> | null {
  const patternSegs = pattern.split("/").filter(Boolean);
  const pathSegs = pathname.split("/").filter(Boolean);

  if (patternSegs.length !== pathSegs.length) return null;

  const params: Record<string, string> = {};
  for (let i = 0; i < patternSegs.length; i++) {
    const seg = patternSegs[i];
    const value = pathSegs[i];
    if (seg === undefined || value === undefined) return null;
    if (seg.startsWith(":")) {
      params[seg.slice(1)] = decodeURIComponent(value);
    } else if (seg !== value) {
      return null;
    }
  }
  return params;
}

function compose(route: Route): Middleware {
  const chain = [...(route.middleware ?? []), route.handler];

  const dispatch = (index: number): Middleware => (ctx) => {
    const mw = chain[index];
    if (!mw) {
      return new Response(JSON.stringify({ error: "Unhandled request" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const result = mw(ctx, () => {
      const nextResult = dispatch(index + 1)(ctx);
      return nextResult instanceof Promise ? nextResult : Promise.resolve(nextResult);
    });

    return result instanceof Promise ? result : Promise.resolve(result);
  };

  return dispatch(0);
}

function findRoute(method: HttpMethod, pathname: string) {
  for (const route of routes) {
    if (route.method !== method) continue;
    if (route.path === pathname) return { route, params: {} };
    const params = matchPath(route.path, pathname);
    if (params) return { route, params };
  }
  return null;
}

export function createServer() {
  return Bun.serve({
    port: env.PORT,
    hostname: "0.0.0.0",

    async fetch(req) {
      // OPTIONS preflight
      const corsResponse = handleCors(req);
      if (corsResponse) return corsResponse;

      const url = new URL(req.url);
      const matched = findRoute(req.method as HttpMethod, url.pathname);

      if (!matched) {
        return notFound(`Route ${req.method} ${url.pathname} not found`);
      }

      const ctx: RouteContext = {
        req,
        params: matched.params,
        query: url.searchParams,
      };

      const handler = compose(matched.route);

      try {
        return await logger(
          () => handler(ctx),
          req
        );
      } catch (error) {
        return handleError(error);
      }
    },
  });
}