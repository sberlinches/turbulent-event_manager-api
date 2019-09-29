import {Router} from 'express';
import {expressWS} from '../lib/httpServer';
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
