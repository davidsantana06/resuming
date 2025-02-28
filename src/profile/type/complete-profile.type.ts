import { Education, Experience, Platform, Profile } from '@prisma/client';

export type CompleteProfile = Profile & {
  educations?: Education[];
  experiences?: Experience[];
  platforms?: Platform[];
};
