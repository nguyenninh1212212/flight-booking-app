import userRepo from "../repo/userRepo";
import bcrypt from "bcryptjs";
import ForbiddenError from "../error/forbiddenError";
import UnauthorizedError from "../error/unauthorizedError";
import NotFoundError from "../error/notFound";
import roleService from "./roleService";
import tokenService from "./tokenService";
import sessionRepo from "../repo/sessionRepo";

import type {
  ILoginRequest,
  IRegisterRequest,
  IAuthResponse,
  IDatasRes,
  IRole,
  IUser,
  IUserRes,
} from "../interfaces/identityType";

const userService = {
  login: async (data: ILoginRequest): Promise<IAuthResponse> => {
    const user = await userRepo.findByEmail(data.email);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      // 🔥 tăng số lần sai
      throw new UnauthorizedError("Invalid credentials");
    }

    // 🔥 reset attempts khi login thành công

    // 🔥 lấy roles
    const roles = await userRepo.getRoles(user.id);
    const roleNames = roles.map((r) => r.name.toUpperCase());

    // 🔥 tạo token
    const accessToken = tokenService.generateAccessToken(user.id, roleNames);

    const refreshToken = tokenService.generateRefreshToken(user.id, roleNames);

    const sessionCount = await sessionRepo.countByUser(user.id);

    if (sessionCount >= 3) {
      await sessionRepo.deleteOldest(user.id);
    }

    await sessionRepo.create({
      userId: user.id,
      token: refreshToken,
    });

    return {
      accessToken,
      refreshToken,
    };
  },

  register: async (data: IRegisterRequest): Promise<void> => {
    const existingUser = await userRepo.findByEmail(data.email);

    if (existingUser) {
      throw new ForbiddenError("Email already in use");
    }

    if(!data.password) {
      throw new Error("Password is required");
    }

    const [role, hashedPassword]: [IRole, string] = await Promise.all([
      roleService.getDefaultRole(),
      bcrypt.hash(data.password, 10),
    ]);

    await userRepo.create(
      {
        email: data.email,
        password: hashedPassword,
      },
      role.id,
    );
  },
  refreshToken: async (
    refreshToken: string,
  ): Promise<{ accessToken: string }> => {
    const payload = tokenService.verifyRefreshToken(refreshToken);
    if (!payload) {
      await sessionRepo.invalidateToken(refreshToken);
      throw new UnauthorizedError("Invalid refresh token");
    }
    const accessToken = tokenService.generateAccessToken(
      payload.sub,
      payload.roles,
    );
    return { accessToken };
  },
  logout: async (refreshToken: string): Promise<void> => {
    tokenService.invalidateRefreshToken(refreshToken);
  },
  changePassword: async (
    userId: string,
    password: string,
    newPassword: string,
  ): Promise<void> => {
    const user = await userRepo.findById(userId);

    if (!user) {
      throw new NotFoundError("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid current password");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userRepo.updatePassword(userId, hashedPassword);
  },
  getAllUsers: async (page: number = 1): Promise<IDatasRes> => {
    const [total, data]: [number, IUserRes[]] = await Promise.all([
      userRepo.getCount(),
      userRepo.findAll(page),
    ]);
    return {
      page,
      total,
      data,
    };
  },
  getUserById: async (id: string) => {
    const user = await userRepo.findById(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  },
};

export default userService;
