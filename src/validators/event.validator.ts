import {NextFunction, Request, Response} from 'express';
import {body} from 'express-validator';
import {validate} from '../lib/validator';

/**
 * Event validator
 */
export class EventValidator {

  /**
   * Insert one
   * @param {Request} req — HTTP request argument
   * @param {Response} res — HTTP response argument
   * @param {NextFunction} next — Callback argument to the middleware function
   */
  public static insertOne = (req: Request, res: Response, next: NextFunction): void => {
    validate([
      body('title')
        .exists()
        .isLength({ min: 2 }),
      body('scheduledAt')
        .exists(),
    ])(req, res, next);
  }
}
