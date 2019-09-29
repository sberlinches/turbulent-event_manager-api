import Mongo from './lib/mongo';
import {HttpServer} from './lib/httpServer';
import {Streams} from './streams/streams';

HttpServer.start()
  .then(() => Mongo.connect())
  .then(() => Streams.connect())
  .catch(() => {
    HttpServer.stop();
    Mongo.close();
    Streams.disconnect();
  });
