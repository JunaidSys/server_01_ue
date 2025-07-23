/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  public statusCode: number;
  public status: 'fail' | 'error';
  public isOperational: boolean;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}



interface ExtendedError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
  code?: number;
  path?: string;
  value?: any;
  errmsg?: string;
  errors?: Record<string, { message: string }>;
}

export function globalErrHandler(
  err: ExtendedError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  console.error('ERROR 🚨', err);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const message:string = err.message ? err.message : 'Internal Server Error';
  // res.status(err.statusCode).json({
  //   message:err.message ? err.message : 'Internal Server Error',
  //   statusCode: err.statusCode,
  //   status: err.status,
  //   err,
  //   stack: err.stack,
  // });

  if (process.env.NODE_ENV === 'development') {
    // let error={...err}
    const error = { ...err, message: err.message, name: err.name };
    // if(err.name==='CastError') error=handleCastErrDB(error)
    // if(err.code===1100) error=handleDuplicateFieldsDB(error)
    // if(err.name==='ValidatorError') error=handleValidationErrDB(error)
    // if(err.name==='JsonWebTokenError') error=handleJsonWebToken(error)
    if (err.name === 'TokenExpiredError') sendErrDev(handleTokenExpiredError(error), res);
    else sendErrDev(error, res);
  } else if (process.env.NODE_ENV === 'production') {
     // let error={...err}
    let error = { ...err, message: err.message, name: err.name };
    if (err.name === 'CastError') error = handleCastErrDB(error);
    if (err.code === 11000) error = handleDuplicateFieldsDB(error);
    if (err.name === 'ValidationError') error = handleValidationErrDB(error);
    if (err.name === 'JsonWebTokenError') error = handleJsonWebToken(error);
    if (err.name === 'TokenExpiredError') error = handleTokenExpiredError(error);

    sendErrProd(error, res);
  } else {
    sendErrDev(err, res); // fallback
  }
}

// Development response
function sendErrDev(err: ExtendedError, res: Response) {
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error',
    statusCode: err.statusCode,
    status: err.status,
    error_name: err?.name ?? 'Error',
    err,
    stack: err.stack,
  });
}

// Production response
function sendErrProd(err: ExtendedError, res: Response) {
  if (err.isOperational) {
    res.status(err.statusCode!).json({
      message: err.message,
      statusCode: err.statusCode,
      status: err.status,
      error_name: err?.name ?? 'Error',
    });
  } else {
    console.error('UNEXPECTED ERROR 💥', err);
    res.status(500).json({
      message: 'Something went wrong',
      statusCode: 500,
    });
  }
}

// === Specific Error Handlers ===
function handleCastErrDB(err: ExtendedError): AppError {
  const message = `Invalid ${err.path}: ${err.value}, Error Name: ${err.name}`;
  return new AppError(400, message);
}
function handleDuplicateFieldsDB(err: ExtendedError): AppError {
  const match = err.errmsg?.match(/(["'])(\\?.)*?\1/);
  const value = match ? match[0] : '<duplicate>';
  const message = `Duplicate field value: ${value}. Please use another value.`;
  return new AppError(400, message);
}
function handleValidationErrDB(err: ExtendedError): AppError {
  const errors = Object.values(err.errors || {}).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(400, message);
}
function handleJsonWebToken(err: ExtendedError): AppError {
  return new AppError(401, `Invalid token. ${err.message}`);
}
function handleTokenExpiredError(err: ExtendedError): AppError {
  return new AppError(401, `Token expired. Please log in again. ${err.message}`);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function logErrorWithContext(err: ExtendedError, req: Request) {
  const context = {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    user: req.user || null,
    body: req.body,
    query: req.query,
    params: req.params,
  };
  console.error('\n--- Error Context ---');
  console.error('Message:', err.message);
  console.error('Status:', err.statusCode);
  console.error('Stack:', err.stack);
  console.error('Request Info:', context);
  console.error('---------------------\n');
}



/**
MONGODB ERROR

  error:{
  message:Cast to ObjectId failed for value \'wwwwww\' at path \'_id\' for model \'Tour\'.
  name:CastError
  stringValue:\'wwwwww\'
  kind:ObjectId,
  path:\'_id\'
  statusCode:500,
  status:error

  }

  error:{
  driver:true,
  name:MongoError
  index:0
  code:11000,
  errmsg:E11000 duplicate key err collection: notours.tours index:name)1 dup key:{:\"The Forest Hiker\"},
  statusCode:500
  status:error

  }
  message:E11000 duplicate key err collection: notours.tours index:name)1 dup key:{:\"The Forest Hiker\"},
  stack:


  UnhandledPromiseRejectionWarning  unhandledPromiseRejection
  in our code there is a promise which is rejected and it was not caught and and handled


  UnCaught exceptions
  all errors (bugs) that occurs in our sync. code but  are not handled anywhere  are called uncaught exceptions
  "
*/
