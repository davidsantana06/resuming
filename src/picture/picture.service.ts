import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';
import { v4 as uuid4 } from 'uuid';
import InvalidFileException from './exception/invalid-file.exception';
import MissingFileException from './exception/missing-file.exception';

@Injectable()
export default class PictureService {
  readonly DEFAULT_FILENAME = '_picture.png';
  private readonly MAX_FILE_SIZE = 256 * 1024; /* ~ 256 KB */
  private readonly VALID_FILE_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

  async save(file: Express.Multer.File | null): Promise<{ filename: string }> {
    if (file == null) throw new MissingFileException();

    const extension = this.extractExtension(file.originalname);

    const invalidExtension = !this.VALID_FILE_EXTENSIONS.includes(extension);
    const invalidSize = file.size > this.MAX_FILE_SIZE;
    if (invalidExtension || invalidSize) throw new InvalidFileException();

    const filename = this.generateFilename(extension);
    const path = this.mountPath(filename);

    await fs.writeFile(path, file.buffer);

    return { filename };
  }

  async delete(filename: string): Promise<void> {
    const path = this.mountPath(filename);
    await fs.unlink(path);
  }

  private generateFilename(extension: string): string {
    return uuid4() + extension;
  }

  private extractExtension(originalname: string): string {
    return path.extname(originalname).toLocaleLowerCase();
  }

  private mountPath(filename: string): string {
    return `static/img/${filename}`;
  }
}
