import { HttpException, HttpStatus } from '@nestjs/common';

export default class InvalidCredentialsException extends HttpException {
  constructor() {
    super('Invalid email and/or password', HttpStatus.UNAUTHORIZED);
  }
}
