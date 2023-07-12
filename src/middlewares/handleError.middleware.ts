import { NextFunction, Request, Response } from "express";
import AppError from "../error";

const handleError = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  if (error instanceof AppError) {
    return res.status(error.status).json({ message: error.message });
  }

  console.error(error);
  return res.status(500).json({ error: "Internal server error." });
};

export default handleError;
