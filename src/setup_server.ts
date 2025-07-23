/* eslint-disable @typescript-eslint/no-unused-vars */
import { Application, json, urlencoded, Response, Request, NextFunction } from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieSession from 'cookie-session';
import HSC from 'http-status-codes';
import { Server } from 'socket.io';
import { createClient } from 'redis';
import { createAdapter } from '@socket.io/redis-adapter';
import Logger from 'bunyan';
import api_stats from 'swagger-stats';
import 'express-async-errors';
import hpp from 'hpp';
import { AppRoutes } from '@root/routes';
import { config } from '@root/config';
import { HttpRes } from '@global/helpers/http-res';
import { CustomError, TErrorRes } from '@global/helpers/error/error-handler';






//-------------------------------------------------------------------------

//__________________________________________________________________________

const log: Logger = config.createLogger('server');
const PORT = config.PORT_SER ? config.PORT_SER : 5050;
export class AppServer {
  private app: Application;
  constructor(app: Application) {
    this.app = app;
  }

  public initiate(): void {
    this.security_middleware(this.app);
    this.standard_middleware(this.app);
    this.routes_middleware(this.app);
    this.api_monitoring(this.app);
    this.global_err_handler(this.app);
    this.initiate_server(this.app);
  }
  private security_middleware(app: Application): void {
    app.set('trust proxy', 1);
    app.use(
      cookieSession({
        name: 'session',
        keys: [config.SECRET_KEY_ONE!, config.SECRET_KEY_TWO!],
        maxAge: 24 * 7 * 3600000,
        secure: config.NODE_ENV !== 'development',
        sameSite: 'none' // comment this line when running the server locally
      })
    );
    app.use(hpp());
    app.use(helmet());
    app.use(
      cors({
        // origin: config.CLIENT_URL,
        origin: '*',
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      })
    );
  }
  private standard_middleware(app: Application): void {
    app.use(compression());
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));
  }
  private routes_middleware(app: Application): void {
    AppRoutes(app);
  }
  private api_monitoring(app: Application): void {}
  private global_err_handler(app: Application): void {
    //  app.all('*', (req: Request, res: Response) => {
    //   HttpRes.NOT_FOUND(res, `${HttpRes.hsc.NOT_FOUND} url:${req.url} ${HttpRes.hsc.getStatusText(HttpRes.hsc.NOT_FOUND)}`);
    //   // throw new NotFoundError(`${HSC.NOT_FOUND} url:${req.url} ${HSC.getStatusText(HSC.NOT_FOUND)}`);
    // });

    app.all('*', (req: Request, res: Response) =>
      HttpRes.NOT_FOUND(
        res,
        `${HttpRes.hsc.NOT_FOUND} url:${req.url} | ${req.originalUrl} ${HttpRes.hsc.getStatusText(HttpRes.hsc.NOT_FOUND)}`
      )
    );
    app.use((err: Error | TErrorRes, req: Request, res: Response, next: NextFunction) => {
      // console.log(err);
      log.error(err);
      if (err instanceof CustomError) {
        log.error(err);
        HttpRes.RES_WITH_DATA(res, err.statusCode, err.serializeErrors());
      } else if (err instanceof Error || typeof Error) {
        log.error(err);
        HttpRes.RES_WITH_DATA(res, 500, { statusCode: 500, status: 'fail', message: 'Server Error', error: err });
      } else {
        next();
      }
    });
  }

  private async initiate_server(app: Application): Promise<void> {
    try {
      const http_server: http.Server = new http.Server(app);
      //this returns server(socketio)
      const socketIo: Server = await this.create_SocketIO(http_server);
      this.initiate_http_server(http_server);
      //setup socketio adapter + socketio
      this.socketIO_connections(socketIo);
    } catch (error) {
      log.error(error);
      throw new Error(`Start Server Error: ${error}`);
    }
  }
  private async create_SocketIO(httpServer: http.Server): Promise<Server> {
    //this is all in order to setup the socketio redis adapter
    const io: Server = new Server(httpServer, {
      cors: {
        origin: config.CLIENT_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      }
    });
    const pubClient = createClient({ url: config.REDIS_HOST });
    const subClient = pubClient.duplicate();
    await Promise.all([pubClient.connect(), subClient.connect()]);
    io.adapter(createAdapter(pubClient, subClient));
    return io;
  }
  private initiate_http_server(httpServer: http.Server): void {
    // console.log(`Server has started with process #${process.pid}`);
    log.info(`Server has started with process #${process.pid}`);
    httpServer.listen(PORT, () =>
      // console.log(`Server running on port:${config.PORT_SER}`)
      log.info(`Server running on port:${PORT}`)
    );
  }
  private socketIO_connections(io: Server): void {
    //every socketio connection that we are going to create , the will be defined inside this fn
    //then what is next is call this method inside initiate_server method
    log.info('socketIO_connections +');
  }
}
