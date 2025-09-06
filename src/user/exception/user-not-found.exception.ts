import { HttpException, HttpStatus } from '@nestjs/common';

export default class EmailAlreadyInUseException extends HttpException {
  constructor(email: string) {
    super(`E-mail ${email} is already in use`, HttpStatus.CONFLICT);
  }
}
