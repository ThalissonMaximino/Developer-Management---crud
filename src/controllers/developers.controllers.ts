import { Request, Response } from "express";
import { TDeveloper, TDeveloperInfos } from "../interfaces/index";
import {
  createDev,
  deleteDev,
  getDev,
  createInfo,
  updateDev,
} from "../services/developers.services";

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developer: TDeveloper = await createDev(req.body);

  return res.status(201).json(developer);
};

export const createInfos = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.params.id;
  const developerInfo: TDeveloperInfos = await createInfo(req.body, id);

  return res.status(201).json(developerInfo);
};

export const retrieve = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developer: TDeveloper = await getDev(req.params.id);

  return res.status(200).json(developer);
};

export const destroy = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await deleteDev(req.params.id);

  return res.status(204).send();
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developer: TDeveloper = await updateDev(req.body, req.params.id);

  return res.status(200).send(developer);
};
