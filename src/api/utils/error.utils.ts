import { Request, Response, NextFunction } from 'express';
export class AppError extends Error {
  statusCode: number;
  status: string;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode < 500 ? 'error' : 'fail';

    Error.captureStackTrace(this, this.constructor);
  }
}

export const tryCatch = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
