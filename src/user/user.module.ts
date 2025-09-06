import { Module } from '@nestjs/common';
import PrismaModule from 'src/prisma/prisma.module';
import UserController from './user.controller';
import UserRepository from './user.repository';
import UserService from './user.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserRepository, UserService],
  exports: [UserService],
})
export default class UserModule {}
