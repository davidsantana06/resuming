import { Injectable } from '@nestjs/common';
import { Prisma, Profile } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfileDto } from './dto/profile.dto';
import { CompleteProfile } from './type/complete-profile.type';

@Injectable()
export class ProfileRepository {
  constructor(private prisma: PrismaService) {}

  create(userId: string, data: ProfileDto): Promise<CompleteProfile> {
    const { educations, experiences, platforms, ...rest } = data;
    return this.prisma.profile.create({
      data: {
        ...rest,
        user: { connect: { id: userId } },
        educations: { create: educations },
        experiences: { create: experiences },
        platforms: { create: platforms },
      },
      include: { educations: true, experiences: true, platforms: true },
    });
  }

  findUnique(
    where: Prisma.ProfileWhereUniqueInput,
  ): Promise<CompleteProfile | null> {
    return this.prisma.profile.findUnique({
      where,
      include: { educations: true, experiences: true, platforms: true },
    });
  }

  update(id: string, data: ProfileDto): Promise<CompleteProfile> {
    const { educations, experiences, platforms, ...rest } = data;
    return this.prisma.profile.update({
      where: { id },
      data: {
        ...rest,
        educations: { deleteMany: { profileId: id }, create: educations },
        experiences: { deleteMany: { profileId: id }, create: experiences },
        platforms: { deleteMany: { profileId: id }, create: platforms },
      },
      include: { educations: true, experiences: true, platforms: true },
    });
  }

  updatePicture(id: string, data: { picture: string }): Promise<Profile> {
    return this.prisma.profile.update({ where: { id }, data });
  }

  delete(id: string): Promise<CompleteProfile> {
    return this.prisma.profile.delete({
      where: { id },
      include: { educations: true, experiences: true, platforms: true },
    });
  }
}
