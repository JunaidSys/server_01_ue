
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthHelper } from '@global/helpers/auth_helper';
import { AppError } from '@global/helpers/error/Error_Handler';
import UtilityHelper from '@global/helpers/utility_helper';

import { Request, Response, NextFunction } from 'express';



// Extend Express Request type to include `user`
declare module 'express-serve-static-core' {
  interface Request {
    user?: any; // Replace `any` with your actual IUser interface if available
    uId?:string | any;
    userId?:string| any;

  }
}

// Define the expected structure of the decoded JWT payload
interface JwtPayload {
  id: string;
  iat: number;
  // Add more fields if your token includes them (e.g., email, role, etc.)
}

export const isAuthMidd =UtilityHelper.catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const headers = req.headers;
    let token: string | undefined;

    // 1. Get token
    if (headers?.authorization?.startsWith('Bearer')) {
      token = headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(
        new AppError(401, 'You are not logged in! Please log in to get access')
      );
    }

    console.log('Token:', token);

    // 2. Verify token
    const decoded = (await AuthHelper.jwt_verify(token)) as JwtPayload;

    console.log('Decoded:', decoded);

    if (!decoded || !decoded.id) {
      return next(new AppError(401, 'Token is not valid'));
    }

    // 3. Check if user still exists
    const user = await User.findById(decoded.id);

    console.log('User:', user);

    if (!user) {
      return next(
        new AppError(401, 'User belonging to this token does not exist')
      );
    }

    // 4. Check if password was changed after the token was issued
    if (user.changedPasswordAfter && user.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError(
          401,
          'User recently changed password. Please log in again.'
        )
      );
    }

    // 5. Grant access
    req.user = user;
    next();
  }
);

export const permissionMidd = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new AppError(
          403,
          'You have no permission to perform this operation'
        )
      );
    }
    next();
  };
};
