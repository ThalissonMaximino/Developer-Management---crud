import { NextFunction, Request, Response } from "express";
import { TDeveloperResult } from "../interfaces";
import { client } from "../database";
import AppError from "../error";

export const verifyIdBody = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.body.developerId;

  const query: TDeveloperResult = await client.query(
    `SELECT * FROM "developers" WHERE "id" = $1;`,
    [id]
  );

  if (query.rowCount === 0) {
    throw new AppError("Developer not found.", 404);
  }

  return next();
};
