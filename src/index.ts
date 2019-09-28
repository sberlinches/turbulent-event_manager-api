import Mongo from './lib/mongo';
import Server from './lib/server';
import {Streams} from './streams/streams';

Server.start()
  .then(() => Mongo.connect())
  .then(() => Streams.connect())
  .catch(() => {
    Server.close();
    Mongo.close();
    Streams.disconnect();
  });
