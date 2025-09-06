import { HttpException, HttpStatus } from '@nestjs/common';

export default class ProfileNotFoundException extends HttpException {
  constructor() {
    super('Profile not found', HttpStatus.NOT_FOUND);
  }
}
