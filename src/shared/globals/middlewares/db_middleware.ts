import { Request, Response, NextFunction } from 'express';
class MiddlewareDB {
  static aliasTopToursByRatingsAverage(req: Request, res: Response, next: NextFunction) {
    req.query.limit = '4';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
  }

  static aliasTopExpensiveTours(req: Request, res: Response, next: NextFunction) {
    req.query.limit = '4';
    req.query.sort = '-price,-ratingsAverage';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
  }

  static aliasTopCheapTours(req: Request, res: Response, next: NextFunction) {
    req.query.limit = '4';
    req.query.sort = 'price,-ratingsAverage';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
  }

  static aliasTopToursByRating(req: Request, res: Response, next: NextFunction) {
    req.query.limit = '4';
    req.query.sort = '-rating,-price,-ratingsAverage';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
  }

  static aliasLastUploaded(req: Request, res: Response, next: NextFunction) {
    req.query.limit = '10';
    req.query.sort = '-createdAt';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
  }
}


export { MiddlewareDB };
