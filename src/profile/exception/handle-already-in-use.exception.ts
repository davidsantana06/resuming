import { HttpException, HttpStatus } from '@nestjs/common';

export default class HandleAlreadyInUseException extends HttpException {
  constructor(handle: string) {
    super(`Handle ${handle} is already in use`, HttpStatus.CONFLICT);
  }
}
