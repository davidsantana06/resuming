import { ApiProperty } from '@nestjs/swagger';
import { Experience } from '@prisma/client';

export class ExperienceEntity implements Experience {
  @ApiProperty({
    title: 'ID',
    example: 1,
    readOnly: true,
  })
  id: number;

  @ApiProperty({
    title: 'Profile ID',
    example: '85585f2c-6c96-4ea3-82c6-0100ee0f13f8',
    readOnly: true,
  })
  profileId: string;

  @ApiProperty({
    title: 'Position',
    example: 'Academic Monitor',
  })
  position: string;

  @ApiProperty({
    title: 'Company',
    example: 'Open Source Software Foundation',
    nullable: true,
  })
  company: string;

  @ApiProperty({
    title: 'Responsabilities',
    example:
      'Developed and maintained RESTful APIs using NestJS and TypeScript, ensuring ' +
      'scalability and high performance. Implemented authentication and authorization ' +
      'mechanisms with JWT and OAuth2. Designed and optimized PostgreSQL database ' +
      'schemas, wrote unit and integration tests with Jest, and contributed to open-source ' +
      'projects, collaborating with developers worldwide.',
    nullable: true,
  })
  responsibilities: string;

  @ApiProperty({
    title: 'From Date',
    example: 'Jan. 2023',
  })
  fromDate: string;

  @ApiProperty({
    title: 'To Date',
    example: 'Present',
  })
  toDate: string;

  @ApiProperty({
    title: 'Created At',
    example: '2021-01-01T00:00:00.000Z',
    readOnly: true,
  })
  createdAt: Date;
}
