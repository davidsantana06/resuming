import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserEntity implements User {
  @ApiProperty({
    title: 'ID',
    example: '77ee486b-34b4-4aa8-8e1b-6bc4c64cc655',
    readOnly: true,
  })
  id: string;

  @ApiProperty({
    title: 'E-mail',
    example: 'name@domain.com',
  })
  email: string;

  @ApiProperty({
    title: 'Password',
    example: '$2b$10$0dLE9P4WlJT83S8hruPIKOcI9HvDiR94U09H2KgVQKdDlMw/T56sa',
  })
  password: string;

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
}
