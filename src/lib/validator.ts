import { validationResult } from 'express-validator';
import {HttpStatus} from './http.enum';

export const validate = (validations) => {
  return async (req, res, next) => {

    await Promise.all(validations.map(validation => validation.run(req)));
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() }); // TODO: Response format
    }

    return next();
  };
};
