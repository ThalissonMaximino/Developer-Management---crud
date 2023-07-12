import { QueryResult } from "pg";

type TProjects = {
  id: number;
  name: string;
  description: string;
  repository: string;
  startDate: Date;
  endDate?: Date;
  developerId: number;
};

type TProjectsRequest = Omit<TProjects, "id">;
type TProjectsResult = QueryResult<TProjects>;

export { TProjects, TProjectsRequest, TProjectsResult };
