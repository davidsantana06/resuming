import { HttpException, HttpStatus } from '@nestjs/common';

export default class MissingFileException extends HttpException {
  constructor() {
    super('File not provided', HttpStatus.BAD_REQUEST);
  }
}
