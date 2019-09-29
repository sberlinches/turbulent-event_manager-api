import {NextFunction, Request, Response} from 'express';
import {body} from 'express-validator';
import {validate} from '../lib/validator';

// Checks whether the string has a date format or not
// TODO: Move custom validation to separate file
const isDate = (value): boolean => {
  return (!isNaN(Date.parse(value)));
};

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
        .isString()
        .isLength({ min: 2 })
        .trim(),
      body('scheduledAt')
        .exists()
        .custom(isDate)
        .toDate(),
    ])(req, res, next);
  }
}
