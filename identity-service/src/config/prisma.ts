const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");

dotenv.config();

const prisma = new PrismaClient();

prisma
  .$connect()
  .then(() => console.log("✅ Prisma 7 connected to PostgreSQL"))
  .catch((err: any) => console.error("❌ Prisma connection error:", err));

module.exports = prisma;
