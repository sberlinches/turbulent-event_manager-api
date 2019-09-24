import config from 'config';
import * as http from 'http';
import express from 'express';
import expressWs from 'express-ws';
import compression from 'compression';
import router from '../controllers/router';

import {NotificationBroadcasterService} from '../services/notificationBroadcaster.service';

export default class Server {

  // private static readonly app = express();
  private static readonly test = expressWs(express());
  private static server;

  /**
   * Creates and starts a HTTP server
   */
  public static async start(): Promise<http.Server> {

    this.test.app.use(compression(config.get('compression')));
    this.test.app.use(express.json(config.get('express.json')));
    this.test.app.use(router);

    const mu = NotificationBroadcasterService.listen();

    this.test.app.ws('/test', (ws, req) => {

      ws.send('connected');

      mu.on('message', (msg) => {
        // @ts-ignore
        this.test.getWss('/test').clients.forEach((client) => {
          client.send(msg);
        });
      });
    });

    return new Promise((resolve, reject) => {
      this.server = this.test.app.listen(config.get('node.port'), config.get('node.host'), (err) => {
        if (err) {
          return reject(err);
        }

        // tslint:disable-next-line:no-console
        console.log('Server listening on: %s:%s (%s)',
          config.get('node.host'),
          config.get('node.port'),
          this.test.app.get('env'),
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
