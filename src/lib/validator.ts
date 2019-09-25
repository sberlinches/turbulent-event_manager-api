import config from 'config';
import Joi, { Schema, ValidationOptions } from '@hapi/joi';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { HttpStatus, HttpCode } from 'lib/http.enum';

export class Validator {

  /**
   * Validates the request body
   * @param schema
   * @param options
   */
  public static validateBody(schema: Schema, options: ValidationOptions = config.get('joi')): RequestHandler {

    return (req: Request, res: Response, next: NextFunction) => {

      const result = Joi.validate(req.body, schema, options);

      if (result.error) {
        return res.status(HttpStatus.BAD_REQUEST)
          .json({
            code: HttpCode.MISSING_FIELD,
            message: `${result.error.details[0].path[0]} required`,
            field: result.error.details[0].path[0],
          });
      }

      return next();
    };
  }
}
