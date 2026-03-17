import prisma from "./config/prisma";
import bcrypt from "bcryptjs";

// seed role
const roleSeed = async () => {
  const roles = ["admin", "user", "staff"];

  for (const roleName of roles) {
    await prisma.role.upsert({
      where: { name: roleName.toUpperCase() },
      update: {},
      create: { name: roleName.toUpperCase() },
    });
  }

  console.log("✅ Role seeded");
};

// seed account
const accountSeed = async () => {
  const accounts = [
    {
      email: "admin@gmail.com",
      password: "123456",
      roles: ["ADMIN"],
    },
    {
      email: "user@gmail.com",
      password: "123456",
      roles: ["USER"],
    },
  ];

  for (const account of accounts) {
    const hashedPassword = await bcrypt.hash(account.password, 10);

    await prisma.user.upsert({
      where: { email: account.email },
      update: {},
      create: {
        email: account.email,
        password: hashedPassword,

        userRoles: {
          create: account.roles.map((roleName) => ({
            role: {
              connect: { name: roleName },
            },
          })),
        },
      },
    });
  }

  console.log("✅ Account seeded");
};

// main seed
async function seed() {
  try {
    await roleSeed(); // ⚠️ phải seed role trước
    await accountSeed();

    console.log("🎉 Seed completed");
  } catch (err) {
    console.error("❌ Seed error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
