import { env } from "./config/env";
import { prisma } from "./config/prisma";
import { createServer } from "./server";

async function bootstrap(): Promise<void> {
  try {
    await prisma.$connect();
    console.log("🗄️  Database connected (SQLite via Prisma)");

    const server = createServer();
    console.log(`⚽ Coffeeland FC backend running at http://localhost:${env.PORT}`);
    console.log(`    Health check: http://localhost:${env.PORT}/api/health`);

    const shutdown = async (signal: string) => {
      console.log(`\n${signal} received — shutting down...`);
      await prisma.$disconnect();
      server.stop(true);
      process.exit(0);
    };

    process.on("SIGINT", () => void shutdown("SIGINT"));
    process.on("SIGTERM", () => void shutdown("SIGTERM"));
  } catch (error) {
    console.error("Failed to start server:", error);
    await prisma.$disconnect().catch(() => {});
    process.exit(1);
  }
}

bootstrap();