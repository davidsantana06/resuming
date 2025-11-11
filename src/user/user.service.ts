import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import PictureService from 'src/picture/picture.service';
import ProfileService from 'src/profile/profile.service';
import UserRepository from './user.repository';
import UserDto from './dto/user.dto';
import EmailAlreadyInUseException from './exception/user-not-found.exception';
import UserNotFoundException from './exception/email-already-in-use.exception';

@Injectable()
export default class UserService {
  constructor(
    private readonly pictureService: PictureService,
    private readonly profileService: ProfileService,
    private readonly userRepository: UserRepository,
  ) {}

  async create(dto: UserDto) {
    const { email, password } = dto;
    const user = await this.findUnique({ email });
    if (user !== null) throw new EmailAlreadyInUseException(email);
    return this.userRepository.create({
      email,
      password: await bcrypt.hash(password, 10),
    });
  }

  findUnique(where: Prisma.UserWhereUniqueInput) {
    return this.userRepository.findUnique(where);
  }

  async getUnique(where: Prisma.UserWhereUniqueInput) {
    const user = await this.findUnique(where);
    if (user === null) throw new UserNotFoundException();
    return user;
  }

  async update(id: string, dto: UserDto) {
    const { email, password } = dto;

    await this.getUnique({ id });
    const user = await this.userRepository.findUnique({ email });

    const emailAlreadyInUse = !!user && user.id !== id;
    if (emailAlreadyInUse) throw new EmailAlreadyInUseException(email);

    return this.userRepository.update(id, {
      email,
      password: await bcrypt.hash(password, 10),
    });
  }

  async delete(id: string) {
    await this.getUnique({ id });
    const profile = await this.profileService.findUnique({ userId: id });
    await this.pictureService.delete(profile?.picture ?? null);
    return this.userRepository.delete(id);
  }
}
