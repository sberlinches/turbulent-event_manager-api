import WebSocket from 'ws';

export class LiveService {

  private readonly host: string;
  private readonly port: number;
  private readonly secure: boolean;
  private readonly protocol: string;
  private liveService: WebSocket;

  /**
   *
   * @param host
   * @param port
   * @param secure
   */
  constructor(host: string, port: number, secure: boolean = false) {
    this.host = host;
    this.port = port;
    this.secure = secure;
    this.protocol = (this.secure) ? 'wss' : 'ws';
  }

  /**
   *
   */
  private get url() {
    return `${this.protocol}://${this.host}:${this.port}`;
  }

  /**
   *
   */
  public connect(): WebSocket {
    this.liveService = new WebSocket(this.url);
    this.liveService.on('error', (err) => {
      const msg = 'Error: Notification server emitter not available';
      // tslint:disable-next-line:no-console
      console.error(msg);
    });
    return this.liveService;
  }

  /**
   *
   */
  public disconnect(): void {
    if (this.liveService) {
      // tslint:disable-next-line:no-console
      console.log('Notification broadcaster disconnected');
      this.liveService.terminate();
    }
  }
}
