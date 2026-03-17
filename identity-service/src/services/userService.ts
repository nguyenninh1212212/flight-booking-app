import userRepo from "../repo/userRepo";
import bcrypt from "bcryptjs";
import ForbiddenError from "../error/forbiddenError";
import UnauthorizedError from "../error/unauthorizedError";
import NotFoundError from "../error/notFound";
import roleService from "./roleService";
import tokenService from "./tokenService";

import type {
  ILoginRequest,
  IRegisterRequest,
  IAuthResponse,
  IRole,
} from "../interfaces/identityType";

const userService = {
  login: async (data: ILoginRequest): Promise<IAuthResponse> => {
    const user = await userRepo.findByEmail(data.email);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const role = await userRepo.getRole(user.id);

    const accessToken = tokenService.generateAccessToken(user.id, [role.name]);
    const refreshToken = tokenService.generateRefreshToken(user.id, [
      role.name,
    ]);

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
};

export default userService;
