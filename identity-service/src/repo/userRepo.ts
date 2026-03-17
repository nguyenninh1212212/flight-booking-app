import prisma from "../config/prisma";

import type {
  IRegisterRequest,
  IRole,
  IUser,
  IUserRes,
} from "../interfaces/identityType";

const userRepo = {
  findAll: async (page: number): Promise<IUserRes[]> => {
    const limit = 10;

    const users = await prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        userRoles: {
          select: {
            role: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return users.map((user) => ({
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      roles: user.userRoles.map((ur) => ur.role.name),
    }));
  },
  findById: async (id: string): Promise<IUser | null> => {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  },

  findByEmail: async (email: string): Promise<IUser | null> => {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  },

  create: async (user: IRegisterRequest, role: number): Promise<IUser> => {
    return await prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        userRoles: {
          create: {
            roleId: role,
          },
        },
      },
    });
  },
  getRoles: async (userId: string): Promise<IRole[]> => {
    const userRoles = await prisma.userRole.findMany({
      where: {
        userId: userId,
      },
      include: {
        role: true,
      },
    });
    return userRoles.map((ur) => ur.role);
  },
  updatePassword: async (
    userId: string,
    newPassword: string,
  ): Promise<void> => {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: newPassword,
      },
    });
  },
  getCount: async (): Promise<number> => {
    return await prisma.user.count();
  },
};

export default userRepo;
