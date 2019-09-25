# Event manager API

## Installation

```bash
$ npm install
$ npm run build
```

## Run
```bash
$ npm start
```

## Tests
```bash
$ npm run test
```

## Public socket
[ws://localhost:3000/events.subscribeScheduledEvents](ws://localhost:3000/events.subscribeScheduledEvents)

## Public endpoint
[GET - http://localhost:3000/events](http://localhost:3000/events)

[POST - http://localhost:3000/events](http://localhost:3000/events)

```json
{
	"title": "Title of the event",
	"scheduledAt": "2019-09-09T10:10:20Z" //UTC datetime
}
```
