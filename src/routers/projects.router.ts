import { Router } from "express";
import { verifyId, verifyIdBody } from "../middlewares";
import {
  createProj,
  retrieveProjectController,
  updateProj,
} from "../controllers/projects.controllers";
import { verifyIdProject } from "../middlewares/verifyIdProject.middleware";

export const projectsRouter: Router = Router();

projectsRouter.post("", verifyIdBody, createProj);
projectsRouter.patch("/:id", verifyId, verifyIdBody, updateProj);
projectsRouter.get("/:id", verifyIdProject, retrieveProjectController);
