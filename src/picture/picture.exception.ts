import { HttpException, HttpStatus } from '@nestjs/common';

export class FileInvalidException extends HttpException {
  constructor() {
    super(
      'File must be a JPG, JPEG, or PNG file and not exceed 256KB',
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class FileMissingException extends HttpException {
  constructor() {
    super('File not provided', HttpStatus.BAD_REQUEST);
  }
}
