import Mongo from './lib/mongo';
import Server from './lib/server';
import {Streams} from './streams/streams';

// Starts in parallel
// TODO: Chain of promises
Promise.all([
  Mongo.connect(),
  Streams.connect(),
  Server.start(),
]).catch((err) => {
  console.error('fail', err);
  Mongo.close();
  Streams.disconnect();
  Server.close();
});
