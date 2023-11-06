import { Request, Response, NextFunction } from 'express';

const logErrors = (
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err.stack);
  next(err);
};

const clientError = async (
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  err.status = err.status || 'fail';
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

const errorHandler = {
  logErrors,
  clientError
};

export default errorHandler;
