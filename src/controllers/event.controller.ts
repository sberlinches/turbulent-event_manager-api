import {Request, Response, NextFunction} from 'express';
import {Server} from 'ws';
import Mongo from '../lib/mongo';
import {Streams} from '../streams/streams';

/**
 * Event controller
 */
export class EventController {

  /**
   * Find all
   * @param {Request} req — HTTP request argument
   * @param {Response} res — HTTP response argument
   * @param {NextFunction} next — Callback argument to the middleware function
   */
  public static findAll = (req: Request, res: Response, next: NextFunction): void => {

    Mongo.model.event.findAll()
      .then((events) => {
        return res
          .status(200) // TODO: literals
          .json(events);
      })
      .catch((err) => next(err)); // TODO: Catch errors
  }

  /**
   * Insert one
   * @param {Request} req — HTTP request argument
   * @param {Response} res — HTTP response argument
   * @param {NextFunction} next — Callback argument to the middleware function
   */
  public static insertOne = (req: Request, res: Response, next: NextFunction): void => {

    // TODO: Body validation and parse
    req.body.scheduledAt = new Date(req.body.scheduledAt);

    Mongo.model.event.insertOne(req.body)
      .then((result) => {
        console.log('%o: New event scheduled at %o', new Date(), result.ops[0].scheduledAt);
        return res
          .status(200) // TODO: literals
          .json(result.ops[0]);
      })
      .catch((err) => next(err)); // TODO: Catch errors
  }

  /**
   * Subscribe scheduled events
   * The subscribed client will receive the next scheduled events
   * @param {Server} wss — WebSocket server
   */
  public static subscribeScheduledEvents = (wss: Server): void => {
    console.log('%o: %s client(s) listening to: /events.subscribeScheduledEvents', new Date(), wss.clients.size);
    wss.clients.forEach( (client) => {
      Streams.notificationBroadcaster.scheduledEvents.subscribe(client);
    });
  }
}
