import WebSocket from 'ws';

/**
 * Stream
 * Handles the connection to a socket server
 */
export class Stream {

  private readonly _protocol: string;
  private readonly _host: string;
  private readonly _port: number;
  private readonly _url: string;
  private _subscribers: Set<WebSocket>;
  private _wss: WebSocket;

  /**
   * @param {String} protocol — The socket server connection protocol
   * @param {String} host — The socket server host
   * @param {Number} port — The socket server port
   */
  constructor(protocol: string, host: string, port: number) {
    this._protocol = protocol;
    this._host = host;
    this._port = port;
    this._url = `${this._protocol}://${this._host}:${this._port}`;
    this._subscribers = new Set<WebSocket>();
  }

  /**
   * Creates the connection to the socket server
   * @param {String} endpoint — The socket server endpoint
   * @return {Promise<WebSocket>} — A promise with the socket connection
   */
  public connect(endpoint: string): Promise<WebSocket> {
    return new Promise((resolve, reject) => {

      this._wss = new WebSocket(`${this._url}/${endpoint}`);

      this._wss.on('error', (err) => {
        reject(err);
      });

      this._wss.on('open', () => {
        this.route();
        resolve(this._wss);
      });
    });
  }

  /**
   * Disconnects from the socket server
   */
  public disconnect(): void {
    if (this._wss) {
      console.log('%o: Socket disconnected', new Date());
      this._wss.terminate();
    }
  }

  /**
   * Subscribes a client to the stream
   * Routes the live-data from the stream directly to the connected client
   * @param {WebSocket} client — A client socket connection
   */
  public subscribe(client: WebSocket): void {
    this._subscribers.add(client);
  }

  /**
   * Routes the live-data from the stream directly to the connected client
   */
  private route(): void {
    this._wss.on('message', (msg) => {
      console.log('%o: %s clients: Broadcasting: %s', new Date(), this._subscribers.size, msg);
      this._subscribers.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(msg);
        }
      });
    });
  }
}
