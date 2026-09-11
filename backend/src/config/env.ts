import { AppError } from "../utils/errors";

function readEnv(name: string, fallback?: string): string {
  const value = process.env[name];
  if (value === undefined || value === "") {
    if (fallback === undefined) {
      throw new AppError(`Missing required environment variable: ${name}`, 500);
    }
    return fallback;
  }
  return value;
}

export const env = {
  PORT: Number(readEnv("PORT", "4000")),
  DATABASE_URL: readEnv("DATABASE_URL", "file:../data/database.sqlite"),
  JWT_SECRET: readEnv("JWT_SECRET", "change-this-in-production-to-a-long-random-string"),
  JWT_EXPIRES_IN: readEnv("JWT_EXPIRES_IN", "7d"),
  JWT_ALGORITHM: readEnv("JWT_ALGORITHM", "HS256"),
  NODE_ENV: readEnv("NODE_ENV", "development"),
};