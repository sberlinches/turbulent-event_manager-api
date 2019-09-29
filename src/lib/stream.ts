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
   * @param {string} protocol — The socket server connection protocol
   * @param {string} host — The socket server host
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
   * @param {string} endpoint — The socket server endpoint
   * @return {Promise<void>} — A promise with the message whether the connection was successful or not
   */
  public connect(endpoint: string): Promise<void> {

    const completeURL = `${this._url}/${endpoint}`;

    return new Promise((resolve, reject) => {

      this._wss = new WebSocket(completeURL);
      let msg;

      this._wss.on('error', (err) => {
        msg = `Socket failed to connect: ${completeURL}`;
        console.log('%o: %s', new Date(), msg);
        reject();
      });

      this._wss.on('open', () => {
        this.route();
        msg = `Socket listening to: ${completeURL}`;
        console.log('%o: %s', new Date(), msg);
        resolve();
      });
    });
  }

  /**
   * @return {WebSocket} — The socket server connection
   */
  public get wss(): WebSocket {
    return this._wss;
  }

  /**
   * Disconnects from the socket server
   */
  public disconnect(): void {
    if (this._wss) {
      console.log('%o: Sockets disconnected', new Date());
      this._wss.terminate();
    }
  }

  /**
   * Subscribes a client to the stream
   * Routes the live-data from the stream directly to the connected client
   * @param {WebSocket} client — A client socket connection
   */
  public subscribe(client: WebSocket): void {
    // TODO: Remove the client (subscriber) when it closes or loses the connection
    this._subscribers.add(client);
  }

  /**
   * Routes the live-data from the stream directly to the connected client
   */
  private route(): void {
    this._wss.on('message', (msg) => {
      console.log('%o: %s client(s): Broadcasting: %s', new Date(), this._subscribers.size, msg);
      this._subscribers.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(msg);
        }
      });
    });
  }
}
