import { Router } from "express";
import multer from "multer";

import { multerConfig } from "../config/multerConfig";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureTeacher } from "../middlewares/ensureTeacher";
import { controllersFactory } from "../utils/controllersFactory";

const {
  createVideoController,
  deleteVideoController,
  registerUserController,
  loginUserController,
} = controllersFactory();

const routes = Router();

routes.post("/register", async (req, res) => {
  return registerUserController.handle(req, res);
});

routes.post("/login", async (req, res) => {
  return loginUserController.handle(req, res);
});

routes.post(
  "/upload",
  ensureAuthenticated,
  ensureTeacher,
  multer(multerConfig).single("file"),
  async (req, res) => {
    return createVideoController.handle(req, res);
  }
);

routes.delete(
  "/video/:key",
  ensureAuthenticated,
  ensureTeacher,
  async (req, res) => {
    return deleteVideoController.handle(req, res);
  }
);

export default routes;
