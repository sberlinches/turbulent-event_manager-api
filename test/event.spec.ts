import request from 'request';
import WebSocket from 'ws';
// TODO: Start server
// TODO: Implement mocks

describe('/events', () => {

  const HttpUri = `http://127.0.0.1:3000/events`;
  const WsUri = `ws://127.0.0.1:3000/events.subscribeScheduledEvents`;
  const options = {
    json: true,
    body: {},
  };

  describe('POST', () => {
    it('should be OK', (done) => {

      options.body = {
        title: 'Hello world',
        scheduledAt: new Date(),
      };

      request.post(HttpUri, options, (error, response, body) => {
        expect(response.statusCode).toEqual(200);
        done();
      });
    });
    it('Should be wrong parameters', (done) => {

      options.body = {};

      request.post(HttpUri, options, (error, response, body) => {
        expect(response.statusCode).toEqual(422);
        done();
      });
    });
    it('Should be wrong title', (done) => done());
    it('Should be wrong date', (done) => done());
  });

  describe('.subscribeScheduledEvents', () => {
    it('should be OK', (done) => {

      const currentDateTime = new Date();
      const scheduledAt = new Date(currentDateTime.getTime() + 1000);
      const ws = new WebSocket(WsUri);

      options.body = {
        title: 'Hello world',
        scheduledAt: scheduledAt,
      };

      ws.on('open', (err) => {
        request.post(HttpUri, options, () => {
          ws.on('message', (msg) => {
            expect(msg).toEqual('Hello world');
            ws.close();
            done();
          });
        });
      });
    });
  });
});
