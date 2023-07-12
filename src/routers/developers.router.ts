import { Router } from "express";
import { create } from "../controllers";
import { verifyEmail, verifyId, verifyDevInfo } from "../middlewares";
import {
  destroy,
  retrieve,
  createInfos,
  update,
} from "../controllers/developers.controllers";

export const developersRouter: Router = Router();

developersRouter.post("", verifyEmail, create);
developersRouter.post("/:id/infos", verifyId, verifyDevInfo, createInfos);
developersRouter.get("/:id", verifyId, retrieve);
developersRouter.patch("/:id", verifyId, verifyEmail, update);
developersRouter.delete("/:id", verifyId, destroy);
developersRouter.post;
