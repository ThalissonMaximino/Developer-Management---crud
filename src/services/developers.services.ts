import { Request, Response } from "express";
import format from "pg-format";
import { QueryResult } from "pg";
import { client } from "../database";
import {
  TDeveloperRequest,
  TDeveloper,
  TDeveloperInfos,
  TDeveloperInfosRequest,
  TDeveloperResult,
  TDeveloperInfosResult,
} from "../interfaces/index";
import AppError from "../error";

export const createDev = async (
  payload: TDeveloperRequest
): Promise<TDeveloper> => {
  const QueryString: string = format(
    `
        INSERT INTO developers(%I)
        VALUES(%L)
        RETURNING *;
        `,
    Object.keys(payload),
    Object.values(payload)
  );
  const queryResult: QueryResult<TDeveloper> = await client.query(QueryString);

  return queryResult.rows[0];
};

export const createInfo = async (
  payload: TDeveloperInfosRequest,
  developerId: string
): Promise<TDeveloperInfos> => {
  payload.developerId = Number(developerId);

  const preferredOs: Array<string> = ["Windows", "Linux", "MacOS"];
  if (!preferredOs.includes(payload.preferredOS)) {
    throw new AppError("Invalid OS option.", 400);
  }
  const queryString: string = format(
    `INSERT INTO "developerInfos" (%I)
    VALUES (%L)
    RETURNING *;`,
    Object.keys(payload),
    Object.values(payload)
  );
  const queryResult: TDeveloperInfosResult = await client.query(queryString);

  return queryResult.rows[0];
};

export const getDev = async (developerId: string): Promise<TDeveloper> => {
  const query: TDeveloperResult = await client.query(
    `SELECT
     dev.id "developerId",
      dev.name  "developerName" , 
      dev.email "developerEmail",
      info."developerSince" "developerInfoDeveloperSince",
      info."preferredOS" "developerInfoPreferredOS"
     FROM "developers" AS dev 
    LEFT JOIN "developerInfos" AS info
    ON dev.id = info.id
    WHERE dev.id = $1;
    `,
    [developerId]
  );

  return query.rows[0];
};

export const updateDev = async (
  payload: TDeveloperRequest,
  developerId: string
): Promise<TDeveloper> => {
  const queryFormat: string = format(
    `
  
 UPDATE "developers" SET (%I) = ROW (%L) WHERE "id" = $1 RETURNING*;`,
    Object.keys(payload),
    Object.values(payload)
  );

  const query: TDeveloperResult = await client.query(queryFormat, [
    developerId,
  ]);
  return query.rows[0];
};

export const deleteDev = async (developerId: string): Promise<void> => {
  await client.query(`DELETE FROM "developers" WHERE "id" = $1;`, [
    developerId,
  ]);
};
