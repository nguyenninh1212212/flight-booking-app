import jwt from "jsonwebtoken";
import forbiddenError from "../error/forbiddenError";
import unauthorizedError from "../error/unauthorizedError";

const authorization = (...allowedRoles: any[]) => {
  return (req: any, res: any, next: any) => {
    const userRole = req.user.roles;

    const hasPermission = userRole.some((role: string) =>
      allowedRoles.includes(role.toUpperCase()),
    );
    if (!hasPermission) {
      throw new forbiddenError(
        "You do not have permission to access this resource",
      );
    }
    next();
  };
};

const authentication = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

  req.user = {
    sub: decoded.sub,
    roles: decoded.roles,
  };

  next();
};

export { authorization, authentication };
