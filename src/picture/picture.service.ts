import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';
import { v4 as uuid4 } from 'uuid';
import {
  FileInvalidException,
  FileMissingException,
} from './picture.exception';

@Injectable()
export class PictureService {
  private readonly MAX_FILE_SIZE = 256 * 1024; /* ~ 256 KB */
  private readonly VALID_FILE_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

  private mountPath(filename: string): string {
    return `static/img/${filename}`;
  }

  private extractExtension(file: Express.Multer.File): string {
    return path.extname(file.originalname).toLocaleLowerCase();
  }

  private generateFilename(extension: string): string {
    return uuid4() + extension;
  }

  async save(file: Express.Multer.File): Promise<{ filename: string }> {
    const isFileMissing = !file;
    if (isFileMissing) throw new FileMissingException();

    const extension = this.extractExtension(file);

    const isExtensionInvalid = !this.VALID_FILE_EXTENSIONS.includes(extension);
    const isSizeInvalid = file.size > this.MAX_FILE_SIZE;
    const isFileInvalid = isExtensionInvalid || isSizeInvalid;
    if (isFileInvalid) throw new FileInvalidException();

    const filename = this.generateFilename(extension);
    const path = this.mountPath(filename);

    await fs.writeFile(path, file.buffer);

    return { filename };
  }

  async delete(filename: string): Promise<void> {
    const path = this.mountPath(filename);
    await fs.unlink(path);
  }
}
