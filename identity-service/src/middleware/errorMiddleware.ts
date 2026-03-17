import { Request, Response, NextFunction } from "express";
import AppError from "../error/appError";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("❌ Error:", err);

  // Prisma error (optional nâng cao)
  if (err.code === "P2002") {
    return res.status(400).json({
      code: "DUPLICATE_FIELD",
      message: "Duplicate field value",
      data: null,
    });
  }

  // Custom error
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      code: err.code,
      message: err.message,
      data: null,
    });
  }

  // Default error
  return res.status(500).json({
    code: "INTERNAL_ERROR",
    message: err.message || "Something went wrong",
    data: null,
  });
};
