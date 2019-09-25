import {Router} from 'express';
import {expressWS} from '../lib/server'; // TODO: Change name
import {EventController} from './event.controller';

export const router = Router();

router.get('/events', EventController.findAll);
router.post('/events', EventController.insertOne);

router.ws('/events.subscribeScheduledEvents', () => {
  EventController.subscribeScheduledEvents(
    // @ts-ignore
    expressWS.getWss('/events.subscribeScheduledEvents'),
  );
});
