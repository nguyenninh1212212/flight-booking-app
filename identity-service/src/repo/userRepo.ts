import prisma from "../config/prisma";

import type {
  IRegisterRequest,
  IRole,
  IUser,
} from "../interfaces/identityType";

const userRepo = {
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
        roleId: role,
      },
    });
  },
  getRole: async (userId: string): Promise<IRole> => {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        role: true, // 🔥 include roles để lấy thông tin role của user
      },
    });
    return user!.role;
  },
};

export default userRepo;
