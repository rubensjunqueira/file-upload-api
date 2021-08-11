import "dotenv/config";
import "reflect-metadata";
import "express-async-errors";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import path from "path";
import "./container";

import { AppError } from "./errors/AppError";
import routes from "./routes";

const app = express();

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(express.json());
app.use(cors());

app.use(
  "/videos",
  express.static(path.resolve(__dirname, "..", "tmp", "aulas"))
);

app.use(routes);

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.code).json({
      message: err.message,
      route: { path: req.path, method: req.method },
    });
  }

  return res.status(500).json({
    message: err.message,
    route: { path: req.path, method: req.method },
    stack: err.stack,
  });
});

export default app;
