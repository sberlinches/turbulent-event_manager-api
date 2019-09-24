import config from 'config';
import Mongo from './lib/mongo';
import app from './lib/app';

Promise.all([
  Mongo.connect(
    config.get('mongo.host'),
    config.get('mongo.port'),
    '',
    '',
    config.get('mongo.clientOptions'),
  ),
  app.listen(
    config.get('node.port'),
    config.get('node.host'),
    () => {
      // tslint:disable-next-line:no-console
      console.log('Server listening on: %s:%s (%s)',
        config.get('node.host'),
        config.get('node.port'),
        app.get('env'),
      );
    }),
])
  .then((res) => {
    console.log('ok', res);
  })
  .catch((err) => {
    console.log('fail', err);
  });
