import { Module } from '@nestjs/common';
import PictureModule from 'src/picture/picture.module';
import PrismaModule from 'src/prisma/prisma.module';
import ProfileModule from 'src/profile/profile.module';
import UserController from './user.controller';
import UserRepository from './user.repository';
import UserService from './user.service';

@Module({
  imports: [PictureModule, PrismaModule, ProfileModule],
  controllers: [UserController],
  providers: [UserRepository, UserService],
  exports: [UserService],
})
export default class UserModule {}
