import { Injectable } from '@nestjs/common';
import {
  HandleAlreadyInUseException,
  ProfileLimitExceededException,
  ProfileNotFoundException,
} from './profile.exception';
import { ProfileRepository } from './profile.repository';
import { ProfileDto } from './dto/profile.dto';
import { CompleteProfile } from './type/complete-profile.type';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async create(userId: string, dto: ProfileDto) {
    const { handle } = dto;

    const profile = await this.profileRepository.findUnique({ userId });
    const otherProfile = await this.profileRepository.findUnique({ handle });

    const isProfileLimitExceeded = !!profile;
    if (isProfileLimitExceeded) throw new ProfileLimitExceededException();

    const isHandleAlreadyInUse = !!otherProfile;
    if (isHandleAlreadyInUse) throw new HandleAlreadyInUseException(handle);

    return this.profileRepository.create(userId, dto);
  }

  async getUnique(
    where: { id: string } | { userId: string },
  ): Promise<CompleteProfile> {
    const profile = await this.profileRepository.findUnique(where);

    const isProfileNotFound = !profile;
    if (isProfileNotFound) throw new ProfileNotFoundException();

    return profile;
  }

  async update(userId: string, dto: ProfileDto) {
    const { handle } = dto;

    const { id } = await this.getUnique({ userId });
    const otherProfile = await this.profileRepository.findUnique({ handle });

    const isHandleAlreadyInUse = !!otherProfile && otherProfile.id !== id;
    if (isHandleAlreadyInUse) throw new HandleAlreadyInUseException(handle);

    return this.profileRepository.update(id, dto);
  }

  async delete(userId: string) {
    const { id } = await this.getUnique({ userId });
    return this.profileRepository.delete(id);
  }
}
