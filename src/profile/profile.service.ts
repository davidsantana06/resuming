import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import PictureService from 'src/picture/picture.service';
import ProfileRepository from './profile.repository';
import ProfileDto from './dto/profile.dto';
import HandleAlreadyInUseException from './exception/handle-already-in-use.exception';
import ProfileLimitExceededException from './exception/profile-limit-exceed-exception';
import ProfileNotFoundException from './exception/profile-not-found.exception';
import CompleteProfile from './type/complete-profile.type';
import ProfileContact from './type/profile-contact.type';

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

    const userProfile = await this.getUnique({ userId });
    const otherProfile = await this.profileRepository.findUnique({ handle });

    const handleAlreadyInUse =
      otherProfile !== null && otherProfile.userId !== userId;
    if (handleAlreadyInUse) throw new HandleAlreadyInUseException(handle);

    return this.profileRepository.update(userProfile.id, dto);
  }

  async delete(userId: string) {
    const { id, picture } = await this.getUnique({ userId });
    if (picture !== null) await this.pictureService.delete(picture);
    return this.profileRepository.delete(id);
  }

  async uploadPicture(userId: string, file: Express.Multer.File) {
    const { id, picture } = await this.getUnique({ userId });

    const canDeleteCurrentPicture =
      picture !== null && picture !== this.pictureService.DEFAULT_FILENAME;
    if (canDeleteCurrentPicture) await this.pictureService.delete(picture);

    const { filename } = await this.pictureService.save(file);

    return this.profileRepository.updatePicture(id, { picture: filename });
  }

  composeContacts(profile: CompleteProfile): ProfileContact[] {
    const { email, phone, platforms } = profile;

    const contacts = [{ name: email, url: `mailto:${email}` }];

    if (phone !== null) contacts.push({ name: phone, url: `tel:${phone}` });

    contacts.push(
      ...platforms.map(({ url }) => ({
        name: this.cleanPlatformUrl(url),
        url,
      })),
    );

    return contacts;
  }

  private cleanPlatformUrl(url: string): string {
    return url.replace(/^(https?:\/\/)?(www\.)?/, '');
  }
}
