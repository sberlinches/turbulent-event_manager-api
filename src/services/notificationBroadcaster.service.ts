import config from 'config';
import {LiveService} from '../lib/liveService';
import WebSocket from 'ws';

export class NotificationBroadcasterService {

  private readonly _host: string;
  private readonly _port: number;
  private readonly _secure: boolean;
  private readonly _method: string;
  private readonly _service: LiveService;
  private _wss: WebSocket;
  private _subscribers: Set<WebSocket>;

  /**
   * Creates the service connection
   * @param {String} method — The service endpoint
   */
  constructor(method: string) {
    this._host = config.get('services.notificationBroadcaster.host');
    this._port = config.get('services.notificationBroadcaster.port');
    this._secure = JSON.parse(config.get('services.notificationBroadcaster.secure'));
    this._method = method;
    this._service = new LiveService(
      this._host,
      this._port,
      this._method,
      this._secure,
    );

    // TODO: This should be async
    this._wss = this._service.connect();
    this.emit();
  }

  /**
   * Subscribes a group of clients to the watcher
   * @param {Set<WebSocket>} clients — A set of sockets
   */
  public subscribe(clients: Set<WebSocket>): void {
    this._subscribers = clients;
  }

  /**
   * Emits the live-data to the subscribed clients
   */
  private emit(): void {
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
