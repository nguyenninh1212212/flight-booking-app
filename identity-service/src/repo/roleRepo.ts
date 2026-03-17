import prisma from "../config/prisma";

const roleRepo = {
  findById: async (id: string) => {
    return await prisma.role.findById({
      where: {
        id: id,
      },
    });
  },

  findAll: async () => {
    return await prisma.role.findMany();
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
};

export default roleRepo;
