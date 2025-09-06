import { HttpException, HttpStatus } from '@nestjs/common';

export default class InvalidFileException extends HttpException {
  constructor() {
    super(
      'File must be a JPG, JPEG, or PNG file and not exceed 256KB',
      HttpStatus.BAD_REQUEST,
    );
  }
}
