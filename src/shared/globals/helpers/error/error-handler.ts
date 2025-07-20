import { Response } from 'express';
import { HttpRes } from '../http-res';
import { extend } from 'joi';
import HTTP_STATUS from 'http-status-codes';
export type TErrorRes = {
  message: string;
  statusCode: number;
  status: string;
  serializeErrors(): TError;
};

export type TError = Omit<TErrorRes, 'serializeErrors'>;

abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract status: string;

  constructor(message: string) {
    super(message);
  }
  serializeErrors(): TError {
    return {
      message: this.message,
      status: this.status,
      statusCode: this.statusCode
    };
  }
}

class JoiReqValidationError extends CustomError {
  statusCode = HTTP_STATUS.BAD_REQUEST;
  status = 'error';
  constructor(message: string) {
    super(message);
  }
}

class BadRequestError extends CustomError {
  statusCode = HTTP_STATUS.BAD_REQUEST;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

class NotFoundError extends CustomError {
  statusCode = HTTP_STATUS.NOT_FOUND;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

class NotAuthorizedError extends CustomError {
  statusCode = HTTP_STATUS.UNAUTHORIZED;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

class FileTooLargeError extends CustomError {
  statusCode = HTTP_STATUS.REQUEST_TOO_LONG;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

class ServerError extends CustomError {
  statusCode = HTTP_STATUS.SERVICE_UNAVAILABLE;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

export { BadRequestError, NotFoundError, JoiReqValidationError, CustomError, ServerError, FileTooLargeError, NotAuthorizedError };
