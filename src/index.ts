import Mongo from './lib/mongo';
import Server from './lib/app';

Promise.all([
  Mongo.connect(),
  Server.start(),
]).catch((err) => {
    console.error('fail', err);
    Mongo.close();
    Server.close();
  });
