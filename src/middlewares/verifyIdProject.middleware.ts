import { NextFunction, Request, Response } from "express";
import { TDeveloperResult } from "../interfaces";
import { client } from "../database";
import AppError from "../error";

export const verifyIdProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id;

  const query: TDeveloperResult = await client.query(
    `SELECT * FROM "projects" WHERE "id" = $1;`,
    [id]
  );

  if (query.rowCount === 0) {
    throw new AppError("Project not found.", 404);
  }

  res.locals.projects = query.rows[0];

  return next();
};
