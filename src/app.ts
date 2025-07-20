
import express, { Express } from 'express';
import { AppServer } from './setup_server';
import connect_db from './setup_db';
import { config } from './config';

class App {
    public initialize():void{
        this.loadConfig();
        connect_db();
        const app:Express=express();
        const server:AppServer=new AppServer(app);
        server.initiate();

    }
    private loadConfig():void{
        config.validateConfig();
        config.cloudinaryConfig();
    }
}

const application:App=new App();
application.initialize();