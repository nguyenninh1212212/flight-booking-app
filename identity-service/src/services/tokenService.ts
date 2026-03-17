import jwt, { Secret, SignOptions } from "jsonwebtoken";
import sessionRepo from "../repo/sessionRepo";
import cryptoUtil from "../util/crypto";
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

const { decrypt, encrypt } = cryptoUtil;

const jwtSecret: Secret = process.env.JWT_SECRET;

const generateToken = (
  sub: string,
  roles: string[],
  expiresIn: SignOptions["expiresIn"],
) => {
  return jwt.sign({ sub: encrypt(sub), roles }, jwtSecret, {
    algorithm: "HS256",
    expiresIn,
  });
};

const tokenService = {
  generateAccessToken: (sub: string, roles: string[]) =>
    generateToken(sub, roles, "1h"),

  generateRefreshToken: (sub: string, roles: string[]) =>
    generateToken(sub, roles, "7d"),
  verifyRefreshToken: (token: string) => {
    try {
      return jwt.verify(token, jwtSecret) as { sub: string; roles: string[] };
    } catch (err) {
      throw new Error("Invalid refresh token");
    }
  },
  invalidateRefreshToken: (token: string) => {
    return sessionRepo.invalidateToken(token);
  },
};

export default tokenService;
