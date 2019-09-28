import {NotificationBroadcasterStream} from './notificationBroadcaster.stream';

/**
 * Streams
 * Bootstraps the stream services
 */
export class Streams {

  // Group of streams
  public static readonly notificationBroadcaster = new NotificationBroadcasterStream();

  /**
   * Connects to the instantiated group of streams
   * @return // TODO
   */
  public static connect() { // TODO: return type
    return Promise.all([
      this.notificationBroadcaster.connect(),
      // anotherGroupOfStreams.connect()
    ]);
  }

  /**
   * Sends the disconnect signal to the group of streams
   */
  public static disconnect(): void {
    this.notificationBroadcaster.disconnect();
    // anotherGroupOfStreams.disconnect()
  }
}
