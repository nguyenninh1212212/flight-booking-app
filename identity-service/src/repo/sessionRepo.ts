import prisma from "../config/prisma";
import type { ISession } from "../interfaces/identityType";

const sessionRepo = {
  create: async (session: ISession) => {
    return await prisma.session.create({
      data: {
        userId: session.userId,
        token: session.token,
      },
    });
  },
  invalidateToken: async (token: string) => {
    return await prisma.session.delete({
      where: {
        token: token,
      },
    });
  },
  countByUser: async (userId: string) => {
    return await prisma.session.count({
      where: {
        userId: userId,
      },
    });
  },
  deleteOldest: async (userId: string) => {
    const oldestSession = await prisma.session.findFirst({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    if (oldestSession) {
      await prisma.session.delete({
        where: {
          token: oldestSession.token,
        },
      });
    }
  },
};

export default sessionRepo;
