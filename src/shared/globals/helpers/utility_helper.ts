
import { Request, Response, NextFunction, RequestHandler } from 'express';
import cloudinary, { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { JwtPayload } from 'jsonwebtoken';
import { AuthHelper } from './auth_helper';
import { config } from '@root/config';
type Cloudinray=UploadApiErrorResponse | UploadApiResponse | undefined

 class UtilityHelper {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static filterObj<T extends Record<string, any>>(obj: T, ...allowedFields: string[]): Partial<T> {
    const newObj: Partial<T> = {};
    Object.keys(obj).forEach((el) => {
      if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
  }
  static catchAsync = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

static uploadToCloudinary( file:string,public_id?:string,overwrite?:boolean,invalidate?:boolean
):Promise<Cloudinray>{
  return new Promise((resolve)=>{
    cloudinary.v2.uploader.upload(file,{
      public_id,
      overwrite,
      invalidate
    },
    (error:UploadApiErrorResponse | undefined,result:UploadApiResponse | undefined)=>{
      if(error) resolve(error);
      resolve(result);
    }
  );
  });
}

}

export default UtilityHelper;




// export function uploadToCloudinary( file:string,public_id?:string,overwrite?:boolean,invalidate?:boolean
// ):Promise<Cloudinray>{
//   return new Promise((resolve)=>{
//     cloudinary.v2.uploader.upload(file,{
//       public_id,
//       overwrite,
//       invalidate
//     },
//     (error:UploadApiErrorResponse | undefined,result:UploadApiResponse | undefined)=>{
//       if(error) resolve(error);
//       resolve(result);
//     }
//   );
//   });
// }

// export const catchAsync = (
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
// ): RequestHandler => {
//   return (req, res, next) => {
//     fn(req, res, next).catch(next);
//   };
// };




export const verifyToken = (
  token: string
): JwtPayload | string | false | undefined => {
  try {
    const decoded = AuthHelper.jwt_verify(token, config.JWT_SECRET_KEY as string);
    return decoded;
  } catch (err) {
    console.error('JWT verification failed:', err);
    return false;
  }
};
