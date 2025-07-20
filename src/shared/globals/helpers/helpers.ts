import cloudinary, { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

type Cloudinray=UploadApiErrorResponse | UploadApiResponse | undefined

export function uploadToCloudinary( file:string,public_id?:string,overwrite?:boolean,invalidate?:boolean
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
