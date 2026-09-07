import type { RouteContext } from "../types";
import { AppError } from "./errors";

export async function parseBody<T = Record<string, unknown>>(req: Request): Promise<T> {
  try {
    const body = await req.json();
    if (body === null || typeof body !== "object") {
      throw new AppError("Request body must be a JSON object", 400);
    }
    return body as T;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Invalid JSON body", 400);
  }
}

export function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function asInt(value: unknown): number | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function asBool(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value === "true" || value === "1";
  return Boolean(value);
}

export function hasOnly(ctx: RouteContext, ...roles: string[]): boolean {
  return ctx.user !== undefined && roles.includes(ctx.user.role);
}

export function sanitizeAdmin<R extends Record<string, unknown>>(admin: R): R {
  const { password: _password, ...rest } = admin;
  return rest as R;
}

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}