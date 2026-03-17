import userService from "../services/userService";
import { success, error } from "../util/response";
import { Response, Request } from "express";

const userController = {
  register: async (req: Request, res: Response, next: any) => {
    try {
      const { email, password } = req.body;
      await userService.register({ email, password });
      success(
        res,
        null,
        "User registered successfully",
        "USER_REGISTERED",
        201,
      );
    } catch (err: any) {
      error(res, err.message, "USER_REGISTRATION_FAILED", 400);
    }
  },
  login: async (req: Request, res: Response, next: any) => {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken } = await userService.login({
        email,
        password,
      });
      success(
        res,
        { accessToken, refreshToken },
        "User logged in successfully",
        "USER_LOGGED_IN",
      );
    } catch (err: any) {
      next(err);
    }
  },
  refreshToken: async (req: Request, res: Response, next: any) => {
    try {
      const { refreshToken } = req.body;
      const { accessToken } = await userService.refreshToken(refreshToken);
      success(
        res,
        { accessToken },
        "Access token refreshed successfully",
        "ACCESS_TOKEN_REFRESHED",
      );
    } catch (err: any) {
      next(err);
    }
  },
  logout: async (req: Request, res: Response, next: any) => {
    try {
      const { refreshToken } = req.body;
      await userService.logout(refreshToken);
      success(res, null, "User logged out successfully", "USER_LOGGED_OUT");
    } catch (err: any) {
      next(err);
    }
  },
  changePassword: async (req: any, res: Response, next: any) => {
    try {
      const userId = req.user.sub.id;
      const { oldPassword, newPassword } = req.body;
      await userService.changePassword(userId, oldPassword, newPassword);
      success(res, null, "Password changed successfully", "PASSWORD_CHANGED");
    } catch (err: any) {
      next(err);
    }
  },
  getAllUsers: async (req: any, res: any, next: any) => {
    try {
      const users = await userService.getAllUsers();
      success(res, users, "Users retrieved successfully", "USERS_RETRIEVED");
    } catch (err: any) {
      next(err);
    }
  },
  getUserById: async (req: any, res: any, next: any) => {
    try {
      const userId = req.params.id;
      const user = await userService.getUserById(userId);
      if (!user) {
        return error(res, "User not found", "USER_NOT_FOUND", 404);
      }
      success(res, user, "User retrieved successfully", "USER_RETRIEVED");
    } catch (err: any) {
      next(err);
    }
  },
};

export default userController;
