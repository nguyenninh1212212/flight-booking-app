import { count } from "node:console";
import prisma from "../config/prisma";

const roleRepo = {
  findById: async (id: number) => {
    return await prisma.role.findUnique({
      where: {
        id: id,
      },
    });
  },

  findAll: async (page: number) => {
    const limit = 10;
    return await prisma.role.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
  },
  findByName: async (name: string) => {
    return await prisma.role.findUnique({
      where: {
        name: name,
      },
    });
  },
  create: async (name: string) => {
    return await prisma.role.create({
      data: {
        name: name,
      },
    });
  },
  update: async (id: number, name: string) => {
    return await prisma.role.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });
  },

  destroy: async (id: number) => {
    return await prisma.role.delete({
      where: {
        id: id,
      },
    });
  },
  count: async (): Promise<number> => {
    return await prisma.role.count();
  },
};

export default roleRepo;
