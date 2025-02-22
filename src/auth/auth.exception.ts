import { HttpException, HttpStatus } from '@nestjs/common';

export class CredentialsInvalidException extends HttpException {
  constructor() {
    super('Invalid email and/or password', HttpStatus.UNAUTHORIZED);
  }
}
