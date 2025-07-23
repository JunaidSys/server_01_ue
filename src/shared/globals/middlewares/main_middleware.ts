
import { AuthHelper } from '@global/helpers/auth_helper';
import { AppError } from '@global/helpers/error/Error_Handler';
import { Request, Response, NextFunction } from 'express';
/// Assumed user type
import jwt from 'jsonwebtoken';


// Extend Express Request to include `user` and `userId`
declare global {
  namespace Express {
    interface Request {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      user?: any ;//IUserDocument;
      userId?: string;
    }
  }
}

class Middleware {
  static permission(...roles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.user || !roles.includes(req.user.role)) {
        return next(new AppError(403, 'You do not have permission to perform this task'));
      }
      next();
    };
  }

  static async auth(req: Request, res: Response, next: NextFunction) {
    let token: string | undefined;

    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      return next(new AppError(401, 'You are not logged in! Please log in to get access'));
    }

    try {
      const decoded = await AuthHelper.jwt_verify(token) as jwt.JwtPayload;
      if (!decoded) return next(new AppError(401, 'Token is not valid'));

      const user = await User.findById(decoded.id);
      if (!user) {
        return next(new AppError(401, 'User belonging to this token does not exist'));
      }

      if (user.changedPasswordAfter(decoded.iat)) {
        return next(new AppError(401, 'User recently changed password. Please log in again.'));
      }

      req.user = user;
      req.userId = user._id.toString();
      next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (err:unknown | any |Error | AppError) {
      return next(new AppError(401, 'Invalid token or expired'));
    }
  }

  static me(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      return next(new AppError(401, 'Not authenticated'));
    }
    req.params.id = req.user.id;
    next();
  }

  static add_user_to_req_body(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      return next(new AppError(401, 'Not authenticated'));
    }
    req.body.user = req.user.id;
    next();
  }

  static async admin(req: Request, res: Response, next: NextFunction) {
    const token = AuthHelper.get_token_from_header(req);
    if (!token) return next(new AppError(401, 'Token is missing'));

    const decoded = await AuthHelper.jwt_verify(token) as jwt.JwtPayload;
    const user = await User.findById(decoded.id);

    if (!user || !user.isAdmin) {
      return next(new AppError(403, 'Access denied. Admins only.'));
    }

    next();
  }
}

export {  Middleware };


// interface JwtPayload {
//   id: string;
//   iat: number;
//   // add more if needed
// }

// const decoded = await AuthHelper.jwt_verify(token) as JwtPayload;
