import { SignJWT, jwtVerify } from "jose";
import { env } from "../config/env";
import type { JwtPayload } from "../types";

const encoder = new TextEncoder();

function secretKey(): Uint8Array {
  return encoder.encode(env.JWT_SECRET);
}

export async function signToken(
  payload: Omit<JwtPayload, "iat" | "exp" | "iss">,
  expiresIn: string = env.JWT_EXPIRES_IN
): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: env.JWT_ALGORITHM })
    .setIssuer("coffeelandfc")
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secretKey());
}

export async function verifyToken(token: string): Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey(), {
      issuer: "coffeelandfc",
    });
    return payload as unknown as JwtPayload;
  } catch {
    return null;
  }
}