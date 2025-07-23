import { config } from '@root/config';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

export class CloudHelper {

    // Configure Cloudinary
  static cloudinarySer = cloudinary.v2.config({
    cloud_name: config.CLOUD_NAME!,
    api_key: config.CLOUD_API_KEY!,
    api_secret: config.CLOUD_API_SECRET!,
  });
 // Instance of Cloudinary storage
  static storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    allowedFormats: ['jpg', 'png'],
    params: {
      folder: 'api-blog',
      transformation: [{ width: 500, height: 500, crop: 'limit' }],
    },
  });
}
