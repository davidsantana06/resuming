import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export default class SignInDto {
  @ApiProperty({
    title: 'E-mail',
    example: 'name@domain.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    title: 'Password',
    example: 'P@ssw0rd!',
  })
  @IsString()
  password: string;
}
