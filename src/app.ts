
import express, { Express } from 'express';
import { AppServer } from '@root/setup_server';
import connect_db from '@root/setup_db';
import { config } from '@root/config';

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
