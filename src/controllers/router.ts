import {Router} from 'express';

import {EventController} from './event.controller';

const router: Router = Router();

router.get('/events', EventController.findAll);
router.post('/events', EventController.insertOne);
// etc...

export default router;
