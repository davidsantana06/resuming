import { HttpException, HttpStatus } from '@nestjs/common';

export class ProfileNotFoundException extends HttpException {
  constructor() {
    super('Profile not found', HttpStatus.NOT_FOUND);
  }
}

export class HandleAlreadyInUseException extends HttpException {
  constructor(handle: string) {
    super(`Handle ${handle} is already in use`, HttpStatus.CONFLICT);
  }
}

export class ProfileLimitExceededException extends HttpException {
  constructor() {
    super('User can have only one profile', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
