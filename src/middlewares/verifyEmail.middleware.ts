import { NextFunction, Request, Response } from "express";
import { TDeveloperResult } from "../interfaces";
import { client } from "../database";
import AppError from "../error";

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const email = req.body.email;

  if (!email) {
    next();
  }

  const query: TDeveloperResult = await client.query(
    `SELECT * FROM "developers" WHERE email = $1;`,
    [email]
  );

  if (query.rowCount !== 0) {
    throw new AppError("Email already exists.", 409);
  }

  return next();
};
