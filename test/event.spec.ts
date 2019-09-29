import request from 'request';
// TODO: Implement mocks

describe('/events', () => {

  const uri = 'http://localhost:3000/events';
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

      request.post(uri, options, (error, response, body) => {
        expect(response.statusCode).toEqual(200);
        done();
      });
    });
    it('Should be wrong parameters', (done) => {

      options.body = {};

      request.post(uri, options, (error, response, body) => {
        expect(response.statusCode).toEqual(422);
        done();
      });
    });
    it('Should be wrong title', (done) => done());
    it('Should be wrong date', (done) => done());
  });

  describe('subscribeScheduledEvents', () => {
    it('should be OK', (done) => {});
  });
});
