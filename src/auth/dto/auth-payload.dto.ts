import { ApiProperty } from '@nestjs/swagger';

export class AuthPayloadDto {
  @ApiProperty({
    title: 'Access Token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    readOnly: true,
  })
  accessToken: string;

  @ApiProperty({
    title: 'Expires At',
    example: '2025-12-25T00:00:00.000Z',
    readOnly: true,
  })
  expiresAt: Date;
}
