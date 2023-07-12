import { NextFunction, Request, Response } from "express";
import { TDeveloperInfosResult } from "../interfaces";
import { client } from "../database";
import AppError from "../error";

export const verifyDevInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const query: TDeveloperInfosResult = await client.query(
    `SELECT * from "developerInfos" WHERE id = $1`,
    [req.params.id]
  );

  if (query.rowCount != 0) {
    throw new AppError("Profile already exists", 409);
  }

  return next();
};
