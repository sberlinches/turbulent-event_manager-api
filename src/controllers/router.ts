import {Router} from 'express';
import {expressWS} from '../lib/httpServer';
import {HttpStatus} from '../lib/http.enum';
import {EventController} from './event.controller';
import {EventValidator} from '../validators/event.validator';

export const router = Router();

// HTTP routes
router.get('/events', EventController.findAll);
router.post('/events', EventValidator.insertOne, EventController.insertOne);

// WS routes
router.ws('/events.subscribeScheduledEvents', (ws, req) => {
  EventController.subscribeScheduledEvents(
    // @ts-ignore
    expressWS.getWss('/events.subscribeScheduledEvents'),
    req,
  );
});

// Non-defined routes
router.use((req, res) => {

  return res
    .status(HttpStatus.NOT_FOUND)
    .json({
      error: `[${req.method}]${req.originalUrl} Not Found`,
    });
});

// TODO: Non-handled responses
