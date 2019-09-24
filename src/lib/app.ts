import config from 'config';
import * as http from 'http';
import express from 'express';
import compression from 'compression';
import router from '../controllers/router';

export default class Server {

  private static readonly app = express();
  private static server;

  /**
   * Creates and starts a HTTP server
   */
  public static async start(): Promise<http.Server> {

    this.app.use(compression(config.get('compression')));
    this.app.use(express.json(config.get('express.json')));
    this.app.use(router);

    return new Promise((resolve, reject) => {
      this.server = this.app.listen(config.get('node.port'), config.get('node.host'), (err) => {
        if (err) {
          return reject(err);
        }

        // tslint:disable-next-line:no-console
        console.log('Server listening on: %s:%s (%s)',
          config.get('node.host'),
          config.get('node.port'),
          this.app.get('env'),
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
