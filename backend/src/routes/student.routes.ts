import {
  deleteStudent,
  getStudent,
  getStudents,
  registerStudent,
  updateStudent,
} from "../controllers/student.controller";
import { requireAuth } from "../middleware/auth.middleware";
import { requireRoles } from "../middleware/role.middleware";
import type { Route } from "../types";

export const studentRoutes: Route[] = [
  { method: "POST", path: "/api/register", handler: registerStudent },
  { method: "GET", path: "/api/students", handler: getStudents, middleware: [requireAuth] },
  {
    method: "GET",
    path: "/api/students/:id",
    handler: getStudent,
    middleware: [requireAuth, requireRoles("admin", "superadmin")],
  },
  {
    method: "PATCH",
    path: "/api/students/:id",
    handler: updateStudent,
    middleware: [requireAuth, requireRoles("admin", "superadmin")],
  },
  {
    method: "DELETE",
    path: "/api/students/:id",
    handler: deleteStudent,
    middleware: [requireAuth, requireRoles("superadmin")],
  },
];