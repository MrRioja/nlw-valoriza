import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import { routes } from "./routes";
import "./database";
import AppError from "./errors/AppError";

const app = express();

app.use(express.json());
app.use(routes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  return res.status(500).json({
    status: "Error",
    message: `Internal server error. ${error.message}`,
  });
});

app.listen(3333);
