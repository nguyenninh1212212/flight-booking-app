import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

prisma
  .$connect()
  .then(() => console.log("✅ Prisma 7 connected to PostgreSQL"))
  .catch((err: any) => console.error("❌ Prisma connection error:", err));

export default prisma;
