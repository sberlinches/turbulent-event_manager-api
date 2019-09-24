import config from 'config';
import {LiveService} from '../lib/liveService';
import WebSocket from 'ws';

export class NotificationBroadcasterService {

  public static listen(): WebSocket {

    const service = new LiveService(
      config.get('services.notificationBroadcaster.host'),
      config.get('services.notificationBroadcaster.port'),
      JSON.parse(config.get('services.notificationBroadcaster.secure')),
    );

    return service.connect();
  }
}
