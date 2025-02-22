import { Profile, Education, Experience, Platform } from '@prisma/client';

export type CompleteProfile = Profile & {
  educations?: Education[];
  experiences?: Experience[];
  platforms?: Platform[];
};
