import userService from "../services/userService";
import { success, error } from "../util/response";

const userController = {
  register: async (req: any, res: any) => {
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
  login: async (req: any, res: any) => {
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
    } catch (error) {}
  },
  getProfile: async (req: any, res: any) => {
    try {
    } catch (error) {}
  },
};

module.exports = userController;
