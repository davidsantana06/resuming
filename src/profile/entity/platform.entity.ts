import { ApiProperty } from '@nestjs/swagger';
import { Platform } from '@prisma/client';

export class PlatformEntity implements Platform {
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
    title: 'Name',
    example: 'GitHub',
  })
  name: string;

  @ApiProperty({
    title: 'Icon',
    example: 'fab fa-github',
  })
  icon: string;

  @ApiProperty({
    title: 'URL',
    example: 'https://github.com/davidsantana06',
  })
  url: string;

  @ApiProperty({
    title: 'Created At',
    example: '2021-01-01T00:00:00.000Z',
    readOnly: true,
  })
  createdAt: Date;
}
