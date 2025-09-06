import { HttpException, HttpStatus } from '@nestjs/common';

export default class UserNotFoundException extends HttpException {
  constructor() {
    super('User not found', HttpStatus.NOT_FOUND);
  }
}
