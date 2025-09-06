import { Module } from '@nestjs/common';
import PictureModule from 'src/picture/picture.module';
import PrismaModule from 'src/prisma/prisma.module';
import ProfileController from './profile.controller';
import ProfileRepository from './profile.repository';
import ProfileService from './profile.service';

@Module({
  imports: [PictureModule, PrismaModule],
  controllers: [ProfileController],
  providers: [ProfileRepository, ProfileService],
  exports: [ProfileService],
})
export default class ProfileModule {}
