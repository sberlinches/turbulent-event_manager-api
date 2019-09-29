import {Request, Response, NextFunction} from 'express';
import {Server} from 'ws';
import Mongo from '../lib/mongo';
import {Streams} from '../streams/streams';
import {HttpStatus} from '../lib/http.enum';

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
          .status(HttpStatus.OK)
          .json(events);
      })
      .catch(next);
  }

  /**
   * Insert one
   * @param {Request} req — HTTP request argument
   * @param {Response} res — HTTP response argument
   * @param {NextFunction} next — Callback argument to the middleware function
   */
  public static insertOne = (req: Request, res: Response, next: NextFunction): void => {

    Mongo.model.event.insertOne(req.body)
      .then((result) => {
        // TODO: logger module
        console.log('%o: New event scheduled at %o', new Date(), result.ops[0].scheduledAt);
        return res
          .status(HttpStatus.OK)
          .json(result.ops[0]);
      })
      .catch(next);
  }

  /**
   * Subscribe scheduled events
   * The subscribed client will receive the next scheduled events
   * @param {Server} wss — WebSocket server
   * @param {Request} req — HTTP request argument
   */
  public static subscribeScheduledEvents = (wss: Server, req: Request) => {
    // TODO: logger module
    console.log('%o: %s client(s) listening to: %s', new Date(), wss.clients.size, req.originalUrl);
    wss.clients.forEach( (client) => {
      Streams.notificationBroadcaster.scheduledEvents.subscribe(client);
    });
  }
}
