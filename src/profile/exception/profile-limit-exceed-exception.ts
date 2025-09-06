import { HttpException, HttpStatus } from '@nestjs/common';

export default class ProfileLimitExceededException extends HttpException {
  constructor() {
    super('Users can have only one profile', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
