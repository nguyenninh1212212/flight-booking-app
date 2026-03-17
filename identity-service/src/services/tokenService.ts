import jwt, { Secret, SignOptions } from "jsonwebtoken";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

const jwtSecret: Secret = process.env.JWT_SECRET;

const generateToken = (
  sub: string,
  roles: string[],
  expiresIn: SignOptions["expiresIn"], 
) => {
  return jwt.sign({ sub, roles }, jwtSecret, {
    algorithm: "HS256",
    expiresIn,
  });
};

const tokenService = {
  generateAccessToken: (sub: string, roles: string[]) =>
    generateToken(sub, roles, "1h"),

  generateRefreshToken: (sub: string, roles: string[]) =>
    generateToken(sub, roles, "7d"),
};

export default tokenService;
