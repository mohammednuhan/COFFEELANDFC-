import { prisma } from "../config/prisma";
import type { RouteContext } from "../types";
import { AppError } from "../utils/errors";
import { signToken } from "../utils/jwt";
import { hashPassword, verifyPassword } from "../utils/password";
import { created, ok } from "../utils/response";
import { asString, isEmail, parseBody, sanitizeAdmin } from "../utils/validate";

type RegisterBody = { username?: string; email?: string; password?: string; role?: string };
type LoginBody = { email?: string; password?: string };

export async function registerAdmin(ctx: RouteContext): Promise<Response> {
  const body = await parseBody<RegisterBody>(ctx.req);

  const username = asString(body.username);
  const email = asString(body.email).toLowerCase();
  const password = asString(body.password);
  const role = body.role === "superadmin" ? "superadmin" : "admin";

  if (!username || !email || !password) {
    throw new AppError("Username, email and password are required", 400);
  }
  if (!isEmail(email)) {
    throw new AppError("Invalid email address", 400);
  }
  if (password.length < 6) {
    throw new AppError("Password must be at least 6 characters", 400);
  }

  const existing = await prisma.admin.findFirst({
    where: { OR: [{ username }, { email }] },
  });
  if (existing) {
    throw new AppError("Username or email already registered", 409);
  }

  const hashed = await hashPassword(password);
  const admin = await prisma.admin.create({
    data: { username, email, password: hashed, role },
    select: { id: true, username: true, email: true, role: true, createdAt: true },
  });

  return created({ message: "Admin registered successfully", admin });
}

export async function login(ctx: RouteContext): Promise<Response> {
  const body = await parseBody<LoginBody>(ctx.req);
  const email = asString(body.email).toLowerCase();
  const password = asString(body.password);

  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) {
    throw new AppError("Invalid credentials", 401);
  }

  const valid = await verifyPassword(password, admin.password);
  if (!valid) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = await signToken({
    sub: String(admin.id),
    username: admin.username,
    email: admin.email,
    role: admin.role,
  });

  const safe = sanitizeAdmin({ ...admin });

  return ok({ message: "Login successful", token, admin: safe });
}

export async function getMe(ctx: RouteContext): Promise<Response> {
  return ok({ user: ctx.user });
}