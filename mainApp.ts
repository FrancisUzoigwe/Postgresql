import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { ErrorFile, STATUS } from "./error/ErrorFile";
import { errorHandler } from "./error/ErrorHandler";

export const mainApp = (app: Application) => {
  app.use(express.json()).use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PATCH", "DELETE"],
    })
  );
  app.all(
    "*",
    (error: ErrorFile, req: Request, res: Response, next: NextFunction) => {
      next(
        new ErrorFile({
          errorMessage: `This is as a result of ${req.originalUrl}`,
          errorName: `${req.originalUrl}`,
          errorStatus: STATUS.BAD,
          errorSuccess: false,
        })
      );
    }
  );
  app.use(errorHandler);
  app.get("/", (req: Request, res: Response) => {
    try {
        return res.status(STATUS.OK).json({
            message: "You now have access to this endpoint"
        })
    } catch (error) {
        return res.status(STATUS.BAD).json({
            message : "You are not allowed to access this endpoint"
        })
    }
  })
};
