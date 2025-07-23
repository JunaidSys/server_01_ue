import dotenv from 'dotenv';
import bunyan from 'bunyan';
import cloudinary from 'cloudinary';
import Logger from 'bunyan';
dotenv.config({});

const log: Logger = bunyan.createLogger({ name: 'API' });
export class Config {
  public PORT_SER: string | undefined;
  public BASE_PATH_VERSION: string | undefined;
  public DATABASE_URL: string | undefined;
  public NODE_ENV: string | undefined;
  public SECRET_KEY_ONE: string | undefined;
  public SECRET_KEY_TWO: string | undefined;
  public CLIENT_URL: string | undefined;
  public REDIS_HOST: string | undefined;
  public CLOUD_NAME: string | undefined;
  public CLOUD_API_KEY: string | undefined;
  public CLOUD_API_SECRET: string | undefined;
  public SENDER_EMAIL: string | undefined;
  public SENDER_EMAIL_PASSWORD: string | undefined;
  public SENDGRID_API_KEY: string | undefined;
  public SENDGRID_SENDER: string | undefined;
  public EC2_URL: string | undefined;
  public REFRESH_TOKEN_PRIVATE_KEY: string | undefined;
  public ACCESS_TOKEN_PRIVATE_KEY: string | undefined;
  public JWT_SECRET_KEY: string | undefined;
  public JWT_EXPIRES_IN: string | number | undefined;
  public JWT_COOKIE_EXPIRES_IN: string | number | undefined;
  private readonly DEFAULT_DATABASE_URL = 'mongodb://0.0.0.0:27017/one';

  constructor() {
    this.PORT_SER = process.env.PORT_SER || '';
    this.BASE_PATH_VERSION = process.env.PORT_SER || '';
    this.DATABASE_URL = process.env.DATABASE_URL || this.DEFAULT_DATABASE_URL;
    this.NODE_ENV = process.env.NODE_ENV || '';
    this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE || '';
    this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO || '';
    this.CLIENT_URL = process.env.CLIENT_URL || '';
    this.REDIS_HOST = process.env.REDIS_HOST || '';
    this.CLOUD_NAME = process.env.CLOUD_NAME || '';
    this.CLOUD_API_KEY = process.env.CLOUD_API_KEY || '';
    this.CLOUD_API_SECRET = process.env.CLOUD_API_SECRET || '';
    this.SENDER_EMAIL = process.env.SENDER_EMAIL || '';
    this.SENDER_EMAIL_PASSWORD = process.env.SENDER_EMAIL_PASSWORD || '';
    this.SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || '';
    this.SENDGRID_SENDER = process.env.SENDGRID_SENDER || '';
    this.EC2_URL = process.env.EC2_URL || '';
    this.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '1234';
    this.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
    this.JWT_COOKIE_EXPIRES_IN = process.env.JWT_COOKIE_EXPIRES_IN;
    this.REFRESH_TOKEN_PRIVATE_KEY = process.env.REFRESH_TOKEN_PRIVATE_KEY || '';
    this.ACCESS_TOKEN_PRIVATE_KEY = process.env.ACCESS_TOKEN_PRIVATE_KEY || '';
  }

  public validateConfig(): void {
    // for (const ele of Object.entries(this)){
    //   console.log(ele);

    // }
    for (const [key, value] of Object.entries(this)) {
      // console.log(this)
      // console.log(Object.entries(this))
      //console.log(`KEY:${key},VALUE:${value}`)
      //const x= Object.entries(this)
      //const [key,value]=x;
      //console.log(key);
      if (value === undefined) {
        log.error(`Configuration ${key} is undefined.`);
        throw new Error(`Configuration ${key} is undefined.`);
      }
    }
  }
  public createLogger(name: string) {
    return bunyan.createLogger({
      name,
      level: 'debug',
      streams: [
        { level: 'info', stream: process.stdout },
        {
          path: './api.log'
        }
      ]
    });
  }

  public cloudinaryConfig(): void {
    cloudinary.v2.config({
      cloud_name: this.CLOUD_NAME,
      api_key: this.CLOUD_API_KEY,
      api_secret: this.CLOUD_API_SECRET
    });
  }
}

export const config: Config = new Config();
