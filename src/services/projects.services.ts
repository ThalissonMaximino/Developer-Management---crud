import format from "pg-format";
import { QueryResult } from "pg";
import { client } from "../database";
import {
  TProjects,
  TProjectsRequest,
  TProjectsResult,
} from "../interfaces/index";

export const createProject = async (
  payload: TProjectsRequest
): Promise<TProjects> => {
  payload.startDate = new Date();

  const QueryString: string = format(
    `
          INSERT INTO "projects"(%I)
          VALUES(%L)
          RETURNING *;
          `,

    Object.keys(payload),
    Object.values(payload)
  );
  const queryResult: QueryResult<TProjects> = await client.query(QueryString);

  return queryResult.rows[0];
};

export const retrieveProject = async (
  projectId: Number
): Promise<TProjects> => {
  const queryTemplate: string = `
SELECT 
p."id" AS "projectId",
p."name" AS "projectName", 
p."description" AS "projectDescription", 
p."repository" AS "projectRepository", 
p."startDate" AS "projectStartDate", 
p."endDate" AS "projectEndDate", 
d."name" AS "projectDeveloperName"
FROM "projects" AS "p"
LEFT JOIN "developers" AS "d"
ON "d"."id" = "p"."developerId" 
WHERE "p"."id" = $1;
`;
  const query: TProjectsResult = await client.query(queryTemplate, [projectId]);
  return query.rows[0];
};

export const updateProject = async (
  payload: TProjectsRequest,
  developerId: string
): Promise<TProjects> => {
  const queryFormat: string = format(
    `UPDATE "projects" SET (%I) = ROW (%L) WHERE "id" = $1 RETURNING *;`,
    Object.keys(payload),
    Object.values(payload)
  );

  const query: TProjectsResult = await client.query(queryFormat, [developerId]);
  return query.rows[0];
};
