import { ApiProperty } from '@nestjs/swagger';
import { CompleteProfile } from '../type/complete-profile.type';
import { EducationEntity } from './education.entity';
import { ExperienceEntity } from './experience.entity';
import { PlatformEntity } from './platform.entity';

export class ProfileEntity implements CompleteProfile {
  @ApiProperty({
    title: 'ID',
    example: '85585f2c-6c96-4ea3-82c6-0100ee0f13f8',
    readOnly: true,
  })
  id: string;

  @ApiProperty({
    title: 'User ID',
    example: '77ee486b-34b4-4aa8-8e1b-6bc4c64cc655',
    readOnly: true,
  })
  userId: string;

  @ApiProperty({
    title: 'Handle',
    example: 'davidsantana06',
  })
  handle: string;

  @ApiProperty({
    title: 'Name',
    example: 'David Santana',
  })
  name: string;

  @ApiProperty({
    title: 'Title',
    example: 'Software Engineer',
  })
  title: string;

  @ApiProperty({
    title: 'Summary',
    example:
      'I’m a technology enthusiast, committed to fostering proactivity, innovation, ' +
      'and organization in the workplace. One of my recent accomplishments was fully ' +
      "developing the Resuming platform — which, in fact, you're accessing right now.",
  })
  summary: string;

  @ApiProperty({
    title: 'E-mail',
    example: 'name@domain.com',
  })
  email: string;

  @ApiProperty({
    title: 'Phone',
    example: '+55 11 99999-9999',
    nullable: true,
  })
  phone: string;

  @ApiProperty({
    title: 'Picture',
    example: '1cefffcf-ddd7-4e8a-8406-dd10d89f8060.png',
    readOnly: true,
  })
  picture: string;

  @ApiProperty({
    title: 'Created At',
    example: '2021-01-01T00:00:00.000Z',
    readOnly: true,
  })
  createdAt: Date;

  @ApiProperty({
    title: 'Updated At',
    example: '2021-01-01T00:00:00.000Z',
    readOnly: true,
  })
  updatedAt: Date;

  @ApiProperty({
    title: 'Educations',
    type: [EducationEntity],
    nullable: true,
  })
  educations: EducationEntity[];

  @ApiProperty({
    title: 'Experiences',
    type: [ExperienceEntity],
    nullable: true,
  })
  experiences: ExperienceEntity[];

  @ApiProperty({
    title: 'Platforms',
    type: [PlatformEntity],
    nullable: true,
  })
  platforms: PlatformEntity[];
}
