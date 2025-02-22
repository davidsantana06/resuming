import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor() {
    super('User not found', HttpStatus.NOT_FOUND);
  }
}

export class EmailAlreadyInUseException extends HttpException {
  constructor(email: string) {
    super(`E-mail ${email} is already in use`, HttpStatus.CONFLICT);
  }
}
