import { NextFunction, Request, Response } from 'express';
import { HttpRes } from '../http-res';
import HSC from 'http-status-codes';
import { CustomError, TErrorRes } from './error-handler';

export const global_err_handler = (err: Error | TErrorRes, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return;
  }

  HttpRes.RES_WITH_DATA(res, 500, { error: err.message || err || HSC.getStatusText(HSC.INTERNAL_SERVER_ERROR) });
  next();
};
