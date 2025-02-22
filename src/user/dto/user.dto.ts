import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDto {
  @ApiProperty({
    title: 'E-mail',
    example: 'name@domain.com',
    minLength: 3,
    maxLength: 254,
    description: 'Must be a valid e-mail address with up to 254 characters',
  })
  @IsEmail()
  @MaxLength(254)
  email: string;

  @ApiProperty({
    title: 'Password',
    example: 'Str0ngP@ssw0rd!',
    minLength: 8,
    maxLength: 32,
    description:
      'Must have between 8 and 32 characters, at least one lowercase letter, one ' +
      'uppercase letter, one number and one symbol',
  })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @MinLength(8)
  @MaxLength(32)
  password: string;
}
