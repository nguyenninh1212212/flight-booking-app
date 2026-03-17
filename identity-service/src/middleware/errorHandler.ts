import { error, success } from "../util/response";

function errorHandler(
  err: { statusCode: number; code: string; message: string },
  req: any,
  res: any,
  next: any,
) {
  const status = err.statusCode || 500;
  const code = err.code || "INTERNAL_ERROR";
  const message = err.message || "Internal server error";

  return error(res, message, code, status);
}

export default errorHandler;
