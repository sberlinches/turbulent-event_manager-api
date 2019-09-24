import {Request, Response, NextFunction} from 'express';
import {Controller} from '../lib/controller';
import Mongo from '../lib/mongo';

export class EventController extends Controller {

  /**
   * Find all
   * @param {Request} req — HTTP request argument
   * @param {Response} res — HTTP response argument
   * @param {NextFunction} next — Callback argument to the middleware function
   */
  public static findAll = (req: Request, res: Response, next: NextFunction ): void => {

    Mongo.model.event.findAll()
      .then((events) => {
        return res
          .status(200)
          .json(events);
      })
      .catch((err) => {
        next(err);
      });
  }

  /**
   * Insert one
   * @param {Request} req — HTTP request argument
   * @param {Response} res — HTTP response argument
   * @param {NextFunction} next — Callback argument to the middleware function
   */
  public static insertOne = (req: Request, res: Response, next: NextFunction ): void => {

    // validation
    // parse
    req.body.scheduledAt = new Date(req.body.scheduledAt); // TODO: validate date first...

    Mongo.model.event.insertOne(req.body)
      .then((result) => {
        return res
          .status(200)
          .json(result.ops[0]);
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }
}
