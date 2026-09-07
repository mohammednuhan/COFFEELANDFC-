import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/utils/password";

const prisma = new PrismaClient();

async function main() {
  const username = process.env.SEED_ADMIN_USERNAME ?? "admin";
  const email = process.env.SEED_ADMIN_EMAIL ?? "admin@coffeelandfc.com";
  const password = process.env.SEED_ADMIN_PASSWORD ?? "admin123";

  const existing = await prisma.admin.findFirst({
    where: { OR: [{ username }, { email }] },
  });

  if (existing) {
    console.log(`ℹ️  Admin already exists: ${existing.email}`);
    return;
  }

  const hashed = await hashPassword(password);
  const admin = await prisma.admin.create({
    data: { username, email, password: hashed },
  });

  console.log(`✅ Seeded admin account:`);
  console.log(`   email:    ${admin.email}`);
  console.log(`   username: ${admin.username}`);
  console.log(`   password: (PLEASE CHANGE) ${password}`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());