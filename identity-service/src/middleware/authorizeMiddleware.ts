const forbiddenError = require("../error/forbiddenError");

const authorize = (...allowedRoles: any[]) => {
  return (req: any, res: any, next: any) => {
    const userRoles = req.user.roles;

    const hasPermission = userRoles.some((role: any) =>
      allowedRoles.includes(role),
    );

    if (!hasPermission) {
      throw new forbiddenError(
        "You do not have permission to access this resource",
      );
    }

    next();
  };
};

module.exports = authorize;
