// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "ripamustopa99@gmail.com";
  const password = "12";

  const passwordHash = await bcrypt.hash(password, 12);

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    await prisma.user.update({
      where: { email },
      data: { passwordHash, passwordChangedAt: new Date() },
    });
    console.log(`Admin user updated: ${email}`);
  } else {
    await prisma.user.create({
      data: {
        email,
        passwordHash,
        passwordChangedAt: new Date(),
      },
    });
    console.log(`Admin user created: ${email}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
