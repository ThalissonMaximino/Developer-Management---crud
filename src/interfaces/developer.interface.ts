import { QueryResult } from "pg";

type TDeveloper = {
    id: number;
    name: string;
    email: string;
  };
  
  type TDeveloperInfos = {
    id: number;
    developerSince: string;
    preferredOS: "Windows" | "Linux" | "MacOS";
    developerId: number;
  };
  
  type TDeveloperRequest = Omit<TDeveloper, "id">;
  type TDeveloperResult = QueryResult<TDeveloper>
  type TDeveloperInfosResult = QueryResult<TDeveloperInfos>
  type TDeveloperUpdate = Partial<TDeveloper>
  type TDeveloperRead = Array<TDeveloper>
  type TDeveloperInfosRequest = Omit<TDeveloperInfos, "id">;
  
  export {
    TDeveloper,
    TDeveloperRequest,
    TDeveloperInfos,
    TDeveloperInfosRequest,
    TDeveloperResult,
    TDeveloperInfosResult
  };
  