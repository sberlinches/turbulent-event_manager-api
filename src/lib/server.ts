import config from 'config';
import * as http from 'http';
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
  public static async start(): Promise<http.Server> {
    return new Promise((resolve, reject) => {
      this.server = expressWS.app.listen(this.port, this.host, (err) => {

        if (err) return reject(err);

        console.log('%o: Server listening on: %s:%s (%s)',
          new Date(),
          this.host,
          this.port,
          expressWS.app.get('env'),
        );

        resolve(this.server);
      });
    });
  }

  /**
   * Closes the HTTP server
   */
  public static close(): void {
    if (this.server) {
      // tslint:disable-next-line:no-console
      console.log('Server closed');
      this.server.close();
    }
  }
}
