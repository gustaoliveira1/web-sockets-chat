import express from 'express';
import http from 'node:http'
import { Server } from 'socket.io';

import { indexRoutes } from './routes/index'

export class App {
  private port: number;
  private app: express.Express;
  private httpServer: http.Server;
  private io: Server;

  constructor(port: number) {
    this.port = port;
    this.app = express();
    this.httpServer = http.createServer(this.app);
    this.io = new Server(this.httpServer);

    this.setupSocketListeners();
    this.setupRoutes();
  }

  public start(): void {
    this.httpServer.listen(this.port, '0.0.0.0', () => {
      console.log(`[info] server listening on *:${this.port}`);
    });
  }

  private setupRoutes(): void {
    this.app.use('/', indexRoutes);
  }

  private setupSocketListeners(): void {
    this.io.on('connection', (socket) => {
      console.log(`[info] user connected (${socket.id})`);

      socket.on('disconnect', () => {
        console.log(`[info] user disconnected (${socket.id})`);
      });

      socket.on('message', (message: string) => {
        console.log(`[info] message sended by user (${socket.id})`);
        this.io.emit('message', message);
      });
    });
     
  }
}
