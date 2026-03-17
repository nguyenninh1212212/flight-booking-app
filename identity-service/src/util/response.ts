import { Response, Request } from "express";

const success = (
  res: Response,
  data: any = null,
  message = "Success",
  code = "SUCCESS",
  status = 200,
) => {
  return res.status(status).json({
    code,
    message,
    data,
  });
};

const error = (
  res: Response,
  message = "Internal error",
  code = "INTERNAL_ERROR",
  status = 500,
) => {
  return res.status(status).json({
    code,
    message,
    data: null,
  });
};

export { success, error };
