import { Prisma } from '@prisma/client';

export type CompleteProfile = Prisma.ProfileGetPayload<{
  include: {
    educations: true;
    experiences: true;
    platforms: true;
  };
}>;
