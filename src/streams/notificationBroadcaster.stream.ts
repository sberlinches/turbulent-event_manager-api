import config from 'config';
import {Stream} from '../lib/stream';

/**
 * Notification Broadcaster Stream
 */
export class NotificationBroadcasterStream {

  private readonly _protocol: string;
  private readonly _host: string;
  private readonly _port: number;
  // Streams
  public readonly scheduledEvents: Stream;

  constructor() {
    this._protocol = config.get('services.notificationBroadcaster.protocol');
    this._host = config.get('services.notificationBroadcaster.host');
    this._port = config.get('services.notificationBroadcaster.port');
    this.scheduledEvents = new Stream(this._protocol, this._host, this._port);
  }

  /**
   * Connects to the instantiated streams
   * @return {Promise<void[]>} — The promises with the message whether the connection was successful or not
   */
  public connect(): Promise<void[]> {
    return Promise.all([
      this.scheduledEvents.connect(config.get('services.notificationBroadcaster.scheduledEvents.endpoint')),
      // anotherStreams.connect()
    ]);
  }

  /**
   * Sends the disconnect signal to the streams
   */
  public disconnect(): void {
    this.scheduledEvents.disconnect();
    // anotherStreams.disconnect()
  }
}
