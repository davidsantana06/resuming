import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuid4 } from 'uuid';
import {
  FileInvalidException,
  FileMissingException,
} from './picture.exception';

@Injectable()
export class PictureService {
  private readonly MAX_FILE_SIZE = 1024 * 256;
  private readonly VALID_FILE_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

  save(file: Express.Multer.File): string {
    const isFileMissing = !file;
    if (isFileMissing) throw new FileMissingException();

    const extension = path.extname(file.originalname).toLocaleLowerCase();

    const isExtensionInvalid = !this.VALID_FILE_EXTENSIONS.includes(extension);
    const isSizeInvalid = file.size > this.MAX_FILE_SIZE;
    const isFileInvalid = isExtensionInvalid || isSizeInvalid;
    if (isFileInvalid) throw new FileInvalidException();

    const fileName = uuid4() + extension;

    fs.writeFileSync(`public/img/${fileName}`, file.buffer);

    return fileName;
  }

  delete(fileName: string): void {
    fs.unlinkSync(`public/img/${fileName}`);
  }
}
