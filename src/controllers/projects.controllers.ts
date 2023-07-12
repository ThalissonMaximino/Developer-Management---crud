import { Request, Response } from "express";
import { TProjects } from "../interfaces/index";
import {
  createProject,
  retrieveProject,
  updateProject,
} from "../services/projects.services";

export const createProj = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const projects: TProjects = await createProject(req.body);

  return res.status(201).json(projects);
};

export const retrieveProjectController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = Number(req.params.id);

  const project: TProjects = await retrieveProject(id);
  return res.status(200).json(project);
};

export const updateProj = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newProject: TProjects = await updateProject(req.body, req.params.id);

  return res.status(200).json(newProject);
};
