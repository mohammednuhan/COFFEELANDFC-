import { getMe, login, registerAdmin } from "../controllers/auth.controller";
import { requireAuth } from "../middleware/auth.middleware";
import type { Route } from "../types";

export const authRoutes: Route[] = [
  { method: "POST", path: "/api/auth/register", handler: registerAdmin },
  { method: "POST", path: "/api/auth/login", handler: login },
  { method: "GET", path: "/api/auth/me", handler: getMe, middleware: [requireAuth] },
];