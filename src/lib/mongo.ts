import {MongoClient, MongoClientOptions} from 'mongodb';
import {EventModel} from '../models/event.model';

export default class Mongo {

  private static client;
  private static models;

  /**
   * Connects to a Mongo DB
   * @param {String} host — Mongo host
   * @param {number} port — Mongo port
   * @param {String} user — Mongo user
   * @param {String} password — Mongo password
   * @param {MongoClientOptions} options — Mongo options
   */
  public static async connect(
    host: string,
    port: number,
    user?: string,
    password?: string,
    options?: MongoClientOptions,
  ) {
    MongoClient.connect(this.url(host, port, user, password), options)
      .then((client) => {
        console.log(`Mongo connected on: ${ host }:${ port }`);
        this.client = client;
        // TODO: Models manager
        this.models = { event: new EventModel(client) };
      })
      .catch((err) => {
        console.log('error', err);
      });
  }

  /**
   *
   */
  public static close() {
    if (this.client) {
      this.client.close();
    }
  }

  /**
   * Prepares the URL string
   * @param {String} host — Mongo host
   * @param {number} port — Mongo port
   * @param {String} user — Mongo user
   * @param {String} password — Mongo password
   */
  private static url(host, port, user, password): string {

    let url = 'mongodb://';

    if (user)
      url += `${user}:${password}@`;

    return url + `${host}:${port}`;
  }

  public static get model() {
    return this.models;
  }
}
