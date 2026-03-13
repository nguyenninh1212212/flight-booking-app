const prisma = require("../config/prisma")
import type { IRegisterRequest, IAuthResponse } from "../interfaces/identityType";

const login = async (email: string, password: string): Promise<IAuthResponse> => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return {
    token: "abc123"
  };
};
