import config from 'config';
import {LiveService} from '../lib/liveService';
import WebSocket from 'ws';

export class NotificationBroadcasterService {

  public static eventUpdate(): WebSocket {

    const service = new LiveService(
      config.get('services.notificationBroadcaster.host'),
      config.get('services.notificationBroadcaster.port'),
      config.get('services.notificationBroadcaster.eventUpdate.path'),
      JSON.parse(config.get('services.notificationBroadcaster.secure')),
    );

    return service.connect();
  }
}
