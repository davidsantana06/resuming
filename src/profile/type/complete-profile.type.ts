import { Prisma } from '@prisma/client';

type CompleteProfile = Prisma.ProfileGetPayload<{
  include: {
    educations: true;
    experiences: true;
    platforms: true;
  };
}>;

export default CompleteProfile;
