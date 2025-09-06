import { ApiProperty } from '@nestjs/swagger';
import { Education } from '@prisma/client';

export default class EducationEntity implements Education {
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
    title: 'Course',
    example: "Bachelor's Degree in Information Systems",
  })
  course: string;

  @ApiProperty({
    title: 'Institution',
    example: 'Federal Institute of Education, Science and Technology of Bahia',
    nullable: true,
  })
  institution: string;

  @ApiProperty({
    title: 'From Date',
    example: 'Mai. 2021',
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
