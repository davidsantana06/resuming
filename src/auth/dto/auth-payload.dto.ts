import { ApiProperty } from '@nestjs/swagger';

export class AuthPayloadDto {
  @ApiProperty({
    title: 'Access Token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Necessary to access protected routes',
  })
  accessToken: string;
}
