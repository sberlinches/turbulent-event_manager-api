import {HttpServer} from './lib/httpServer';
import {EventsManagerDb} from './databases/eventsManager/eventsManager.db';
import {Streams} from './streams/streams';

HttpServer.start()
  .then(() => EventsManagerDb.connect())
  .then(() => Streams.connect())
  .catch(() => {
    HttpServer.stop();
    EventsManagerDb.close();
    Streams.disconnect();
  });
