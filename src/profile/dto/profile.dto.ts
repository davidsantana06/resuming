import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import EducationDto from './education.dto';
import ExperienceDto from './experience.dto';
import PlatformDto from './platform.dto';

export default class ProfileDto {
  @ApiProperty({
    title: 'Handle',
    example: 'davidsantana06',
    minLength: 3,
    maxLength: 30,
    description:
      'Must be between 3 and 30 characters, only lowercase letters, numbers, and ' +
      'underscores, and cannot be "api", "static", or "swagger"',
  })
  @Matches(/^[a-z0-9_]+$/, {
    message:
      'handle can only contain lowercase letters, numbers, and underscores',
  })
  @Matches(/^(?!api$|static$|swagger$).+$/, {
    message: "handle cannot be in ['api', 'static', 'swagger']",
  })
  @MinLength(3)
  @MaxLength(30)
  handle: string;

  @ApiProperty({
    title: 'Name',
    example: 'David Santana',
    minLength: 3,
    maxLength: 50,
    description: 'Must have between 3 and 50 characters',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @ApiProperty({
    title: 'Title',
    example: 'Software Engineer',
    minLength: 3,
    maxLength: 50,
    description: 'Must have between 3 and 50 characteres',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  title: string;

  @ApiProperty({
    title: 'Summary',
    example:
      'I’m a technology enthusiast, committed to fostering proactivity, innovation, ' +
      'and organization in the workplace. One of my recent accomplishments was fully ' +
      "developing the Resuming platform — which, in fact, you're accessing right now.",
    minLength: 3,
    maxLength: 300,
    description: 'Must have between 3 and 300 characters',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(300)
  summary: string;

  @ApiProperty({
    title: 'E-mail',
    example: 'name@domain.com',
    maxLength: 50,
    description: 'Must be a valid e-mail address with up to 50 characters',
  })
  @IsEmail()
  @MaxLength(50)
  email: string;

  @ApiPropertyOptional({
    title: 'Phone',
    example: '+55 11 99999-9999',
    maxLength: 20,
    description: 'Must be a valid phone number with up to 20 characters',
  })
  @IsOptional()
  @IsPhoneNumber()
  @MaxLength(20)
  phone?: string;

  @ApiPropertyOptional({
    title: 'Platforms',
    type: [PlatformDto],
    maxItems: 3,
    description: 'Must have up to 3 items',
  })
  @IsOptional()
  @ArrayMaxSize(3)
  @ValidateNested({ each: true })
  @Type(() => PlatformDto)
  platforms?: PlatformDto[];

  @ApiPropertyOptional({
    title: 'Experiences',
    type: [ExperienceDto],
    maxItems: 10,
    description: 'Must have up to 10 items',
  })
  @IsOptional()
  @ArrayMaxSize(10)
  @ValidateNested({ each: true })
  @Type(() => ExperienceDto)
  experiences?: ExperienceDto[];

  @ApiPropertyOptional({
    title: 'Educations',
    type: [EducationDto],
    maxItems: 5,
    description: 'Must have up to 5 items',
  })
  @IsOptional()
  @ArrayMaxSize(5)
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  educations?: EducationDto[];
}
