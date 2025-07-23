// auth.helper.ts
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Response, Request } from 'express';




// interface UserPayload {
//   _id: string;
//   role: string;
//   password?: string;
//   [key: string]: any;
// }

// static createSendTokenAndRes(user: UserPayload, statusCode: number, res: Response): void

export class AuthHelper {
  static jwt_sign(user: { _id: string; role: string }): string {
    const payload = { id: user._id, role: user.role };
    return jwt.sign(payload, config.JWT_SECRET_KEY as string, {
      expiresIn: config.JWT_EXPIRES_IN as string,
    });
  }

  static jwt_verify(token: string): string | JwtPayload | undefined {
    try {
      return jwt.verify(token, config.JWT_SECRET_KEY as string);
    } catch (err) {
      console.error('JWT verification failed:', err);
      return undefined;
    }
  }

  static async jwt_sign_v1(user: { _id: string; role: string }) {
    try {
      const payload = { id: user._id, role: user.role };

      const accessToken = jwt.sign(payload, config.ACCESS_TOKEN_PRIVATE_KEY as string, {
        expiresIn: '14m',
      });

      const refreshToken = jwt.sign(payload, config.REFRESH_TOKEN_PRIVATE_KEY as string, {
        expiresIn: '30d',
      });

      const existingToken = await UserToken.findById(user._id);
      if (existingToken) await existingToken.remove();
      await new UserToken({ userId: user._id, token: refreshToken }).save();

      return { accessToken, refreshToken };
    } catch (err) {
      console.error('JWT sign v1 failed:', err);
      return Promise.reject(err);
    }
  }

  static jwt_verify_v1(refreshToken: string) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      UserToken.findOne({ token: refreshToken }, (err: any, doc: any) => {
        if (!doc) return reject({ error: true, message: 'Invalid refresh token' });

        jwt.verify(
          refreshToken,
          config.REFRESH_TOKEN_PRIVATE_KEY as string,
          (err, tokenDetails) => {
            if (err)
              return reject({ error: true, message: 'Invalid refresh token' });

            resolve({ tokenDetails, error: false, message: 'Valid refresh token' });
          }
        );
      });
    });
  }

  static async bcrypt_hash(password: string, salt = 12): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  static async bcrypt_decode(candidatePass: string, userPass: string): Promise<boolean> {
    return await bcrypt.compare(candidatePass, userPass);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static createSendTokenAndRes(user: any, statusCode: number, res: Response): void {
    const token = this.jwt_sign(user);
    const cookieOptions = {
      expires: new Date(
        Date.now() + Number(config.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    };

    res.cookie('jwt', token, cookieOptions);
    user.password = undefined;

    res.status(statusCode).json({
      status: 'success',
      token,
      data: user,
    });
  }

  static get_token_from_header(req: Request): string | false {
    const token = req.headers['authorization']?.split(' ')[1];
    return token ?? false;
  }
}


import mongoose from 'mongoose';
import { config } from '@root/config';

const Schema = mongoose.Schema;

const userTokenSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	token: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 30 * 86400, // 30 days
	},
});
//Number of seconds in a day = 24 * 60 * 60 = 86400 seconds.
//1 second = 1000 milliseconds.
//So after calculating the expression, the result is in milliseconds.
//days * 24 * 60 * 60 * 1000 = days * 86400000 ms
const UserToken = mongoose.model('UserToken', userTokenSchema);



export default UserToken;
