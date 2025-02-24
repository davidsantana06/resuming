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

  private extractExtension(file: Express.Multer.File): string {
    return path.extname(file.originalname).toLocaleLowerCase();
  }

  private generateFilename(extension: string): string {
    return uuid4() + extension;
  }

  save(file: Express.Multer.File): { filename: string } {
    const isFileMissing = !file;
    if (isFileMissing) throw new FileMissingException();

    const extension = this.extractExtension(file);

    const isExtensionInvalid = !this.VALID_FILE_EXTENSIONS.includes(extension);
    const isSizeInvalid = file.size > this.MAX_FILE_SIZE;
    const isFileInvalid = isExtensionInvalid || isSizeInvalid;
    if (isFileInvalid) throw new FileInvalidException();

    const filename = this.generateFilename(extension);

    fs.writeFileSync(`public/img/${filename}`, file.buffer);

    return { filename };
  }

  delete(filename: string): void {
    fs.unlinkSync(`public/img/${filename}`);
  }
}
