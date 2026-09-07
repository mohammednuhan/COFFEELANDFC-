import { createContact, deleteContact, getContacts } from "../controllers/contact.controller";
import { requireAuth } from "../middleware/auth.middleware";
import type { Route } from "../types";

export const contactRoutes: Route[] = [
  { method: "POST", path: "/api/contact", handler: createContact },
  { method: "GET", path: "/api/contacts", handler: getContacts, middleware: [requireAuth] },
  {
    method: "DELETE",
    path: "/api/contacts/:id",
    handler: deleteContact,
    middleware: [requireAuth],
  },
];