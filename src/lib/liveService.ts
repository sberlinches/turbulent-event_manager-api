import WebSocket from 'ws';

// TODO: Reconnection method
export class LiveService {

  private readonly host: string;
  private readonly port: number;
  private readonly method: string;
  private readonly secure: boolean;
  private readonly protocol: string;
  private liveService: WebSocket;

  /**
   * @param {String} host — The service host
   * @param {Number} port — The service port
   * @param {String} method — The service endpoint
   * @param {Boolean} secure — Whether the service is secured or not
   */
  constructor(host: string, port: number, method: string, secure: boolean = false) {
    this.host = host;
    this.port = port;
    this.method = method;
    this.secure = secure;
    this.protocol = (this.secure) ? 'wss' : 'ws';
  }

  /**
   * Generates the URL string
   * @return {String} URL — The URL string
   */
  private get url(): string {
    return `${this.protocol}://${this.host}:${this.port}/${this.method}`;
  }

  /**
   * Creates the connection to the service
   */
  public connect(): WebSocket {
    this.liveService = new WebSocket(this.url);
    this.liveService.on('error', (err) => {
      console.error('%o: Notification server emitter not available', new Date());
    });
    return this.liveService;
  }

  /**
   * Disconnects from the service
   */
  public disconnect(): void {
    if (this.liveService) {
      console.log('%o: Notification broadcaster disconnected', new Date());
      this.liveService.terminate();
    }
  }
}
