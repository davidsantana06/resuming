import { ApiProperty } from '@nestjs/swagger';
import { Experience } from '@prisma/client';

export default class ExperienceEntity implements Experience {
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
    example: 'Federal Institute of Bahia',
    nullable: true,
  })
  company: string;

  @ApiProperty({
    title: 'Responsibilities',
    example:
      'Taught Information Systems students key Java concepts such as exceptions, ' +
      'threads, generics, collections, I/O, and JavaFX, and provided support with ' +
      'assignments, academic projects, and exams.',
    nullable: true,
  })
  responsibilities: string;

  @ApiProperty({
    title: 'From Date',
    example: 'Sep. 2022',
  })
  fromDate: string;

  @ApiProperty({
    title: 'To Date',
    example: 'Dec. 2022',
  })
  toDate: string;

  @ApiProperty({
    title: 'Created At',
    example: '2021-01-01T00:00:00.000Z',
    readOnly: true,
  })
  createdAt: Date;
}
