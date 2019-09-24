import {Validator} from './validator';

export class Controller {

  protected readonly validator: Validator;

  public constructor() {
    this.validator = Validator;
  }
}
