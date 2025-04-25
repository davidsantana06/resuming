import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import {
  EmailAlreadyInUseException,
  UserNotFoundException,
} from './user.exception';
import { UserRepository } from './user.repository';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(dto: UserDto) {
    const { email, password } = dto;

    const otherUser = await this.findUnique({ email });

    const isEmailAlreadyInUse = !!otherUser;
    if (isEmailAlreadyInUse) throw new EmailAlreadyInUseException(email);

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

    const isUserNotFound = !user;
    if (isUserNotFound) throw new UserNotFoundException();

    return user;
  }

  async update(id: string, dto: UserDto) {
    const { email, password } = dto;

    await this.getUnique({ id });
    const otherUser = await this.userRepository.findUnique({ email });

    const isEmailAlreadyInUse = !!otherUser && otherUser.id !== id;
    if (isEmailAlreadyInUse) throw new EmailAlreadyInUseException(email);

    return this.userRepository.update(id, {
      email,
      password: await bcrypt.hash(password, 10),
    });
  }

  async delete(id: string) {
    await this.getUnique({ id });
    return this.userRepository.delete(id);
  }
}
