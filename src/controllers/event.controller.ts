import {Request, Response, NextFunction} from 'express';
import * as ws from 'ws';
import Mongo from '../lib/mongo';
import {Controller} from '../lib/controller';
import {Streams} from '../streams/streams';

export class EventController extends Controller {

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
        return res
          .status(200) // TODO: literals
          .json(result.ops[0]);
      })
      .catch((err) => next(err)); // TODO: Catch errors
  }

  /**
   * Subscribe scheduled events
   * The subscribed client will receive the next scheduled events
   * @param {ws.Server} wss — WebSocket server
   */
  public static subscribeScheduledEvents = (wss: ws.Server): void => {
    wss.clients.forEach( (client) => {
      Streams.notificationBroadcaster.scheduledEvents.subscribe(client);
    });
  }
}
