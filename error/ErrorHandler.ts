import { Request, Response, NextFunction } from "express";
import { ErrorFile, STATUS, iError } from "../error/ErrorFile";

export const handleError = (
  error: ErrorFile,
  //   req: Request,
  res: Response
  //   next: NextFunction
) => {
  return res.status(STATUS.BAD).json({
    errorMessage: error.errorMessage,
    errorName: error.errorName,
    errorStatus: error.errorStatus,
    errorSuccess: error.errorSuccess,
    errorStack: error.stack,
    error,
  });
};

export const errorHandler = (
  error: ErrorFile,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  handleError(error, res);
};
