import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import PictureService from 'src/picture/picture.service';
import ProfileRepository from './profile.repository';
import ProfileDto from './dto/profile.dto';
import HandleAlreadyInUseException from './exception/handle-already-in-use.exception';
import ProfileLimitExceededException from './exception/profile-limit-exceed-exception';
import ProfileNotFoundException from './exception/profile-not-found.exception';

@Injectable()
export default class ProfileService {
  constructor(
    private readonly pictureService: PictureService,
    private readonly profileRepository: ProfileRepository,
  ) {}

  async create(userId: string, dto: ProfileDto) {
    const { handle } = dto;

    const userProfile = await this.profileRepository.findUnique({ userId });
    if (userProfile !== null) throw new ProfileLimitExceededException();

    const otherProfile = await this.profileRepository.findUnique({ handle });
    if (otherProfile !== null) throw new HandleAlreadyInUseException(handle);

    return this.profileRepository.create(userId, dto);
  }

  async getUnique(where: Prisma.ProfileWhereUniqueInput) {
    const profile = await this.profileRepository.findUnique(where);
    if (profile == null) throw new ProfileNotFoundException();
    return profile;
  }

  async update(userId: string, dto: ProfileDto) {
    const { handle } = dto;

    await this.getUnique({ userId });
    const profile = await this.profileRepository.findUnique({ handle });

    const handleAlreadyInUse = profile !== null && profile.id !== userId;
    if (handleAlreadyInUse) throw new HandleAlreadyInUseException(handle);

    return this.profileRepository.update(userId, dto);
  }

  async delete(userId: string) {
    const { picture } = await this.getUnique({ userId });
    if (picture !== null) await this.pictureService.delete(picture);
    return this.profileRepository.delete(userId);
  }

  async uploadPicture(userId: string, file: Express.Multer.File) {
    const { picture } = await this.getUnique({ userId });

    const canDelete =
      picture !== null && picture !== this.pictureService.DEFAULT_FILENAME;
    if (canDelete) await this.pictureService.delete(picture);

    const { filename } = await this.pictureService.save(file);

    return this.profileRepository.updatePicture(userId, { picture: filename });
  }
}
