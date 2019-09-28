import config from 'config';
import http from 'http';
import express from 'express';
import expressWs from 'express-ws';
import compression from 'compression';

// TODO: Split this file into HTTPServer and WSServer
export const expressWS = expressWs(express());
import {router} from '../controllers/router';
expressWS.app.use(compression(config.get('compression')));
expressWS.app.use(express.json(config.get('express.json')));
expressWS.app.use(router);

export default class Server {

  private static readonly host: string = config.get('node.host');
  private static readonly port: number = config.get('node.port');
  private static server;

  /**
   * Creates and starts a HTTP server
   */
  public static async start(): Promise<void> {
    return new Promise((resolve, reject) => {

      this.server = http.createServer(expressWS.app);

      const completeURL = `${this.host}:${this.port}`;
      let msg;

      this.server.on('error', (e) => {
        msg = `Server failed to run on: ${completeURL}`;
        console.log('%o: %s', new Date(), msg);
        reject();
      });

      this.server.listen(this.port, this.host, () => {
        msg = `Server running on: ${completeURL}`;
        console.log('%o: %s', new Date(), msg);
        resolve();
      });
    });
  }

  /**
   * Closes the HTTP server
   */
  public static close(): void {
    if (this.server) {
      console.log('%o: Server closed', new Date());
      this.server.close();
    }
  }
}
