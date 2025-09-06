import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

export default class PlatformDto {
  @ApiProperty({
    title: 'Name',
    example: 'GitHub',
    minLength: 3,
    maxLength: 50,
    description: 'Must have between 3 and 50 characters',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @ApiProperty({
    title: 'Icon',
    example: 'fab fa-github',
    minLength: 3,
    maxLength: 30,
    description:
      'Must be a Free Font Awesome icon class (https://fontawesome.com/search?ic=free) ' +
      'and have between 3 and 30 characters',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  icon: string;

  @ApiProperty({
    title: 'URL',
    example: 'https://github.com/davidsantana06',
    maxLength: 200,
    description: 'Must be a valid URL with up to 200 characters',
  })
  @IsUrl()
  @MaxLength(200)
  url: string;
}
