import { prisma } from "../config/prisma";
import type { Middleware } from "../types";
import { AppError } from "../utils/errors";
import { created, noContent, notFound, ok } from "../utils/response";
import { asInt, asString, isEmail, parseBody } from "../utils/validate";

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  inquiry?: string;
  message?: string;
};

export const createContact: Middleware = async (ctx) => {
  const body = await parseBody<ContactBody>(ctx.req);

  const name = asString(body.name);
  const email = asString(body.email).toLowerCase();
  const phone = asString(body.phone);
  const inquiry = asString(body.inquiry);
  const message = asString(body.message);

  if (!name || !email || !message) {
    throw new AppError("Name, email and message are required", 400);
  }
  if (!isEmail(email)) {
    throw new AppError("Invalid email address", 400);
  }

  const date = new Date().toISOString().split("T")[0];

  const contact = await prisma.contact.create({
    data: { name, email, phone, inquiry, message, date },
  });

  return created({
    message: "Message received, thank you!",
    contact: { id: contact.id, date: contact.date },
  });
};

export const getContacts: Middleware = async () => {
  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
  });

  return ok({ count: contacts.length, contacts });
};

export const deleteContact: Middleware = async (ctx) => {
  const id = asInt(ctx.params.id);
  if (id === undefined || !Number.isInteger(id)) {
    throw new AppError("Invalid contact id", 400);
  }

  await prisma.contact
    .delete({ where: { id } })
    .catch(() => {
      throw new AppError("Contact not found", 404);
    });

  return noContent();
};