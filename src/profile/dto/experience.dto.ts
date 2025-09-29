import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export default class ExperienceDto {
  @ApiProperty({
    title: 'Position',
    example: 'Academic Monitor',
    minLength: 3,
    maxLength: 50,
    description: 'Must have between 3 and 50 characters',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  position: string;

  @ApiPropertyOptional({
    title: 'Company',
    example: 'Federal Institute of Education, Science and Technology of Bahia',
    minLength: 3,
    maxLength: 100,
    description: 'Must have between 3 and 100 characters',
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  company?: string;

  @ApiPropertyOptional({
    title: 'Responsibilities',
    example:
      'Taught and provided support in practical Java activities, including ' +
      'Exceptions, Threads, Collections, I/O, and JavaFX, resulting in significant ' +
      'improvement in class performance throughout the semester.',
    minLength: 3,
    maxLength: 2000,
    description: 'Must have between 3 and 2000 characters',
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(2000)
  responsibilities?: string;

  @ApiProperty({
    title: 'From Date',
    example: 'Set. 2022',
    maxLength: 20,
    description: 'Can be any format with up to 20 characters',
  })
  @IsString()
  @MaxLength(20)
  fromDate: string;

  @ApiProperty({
    title: 'To Date',
    example: 'Dez. 2022',
    maxLength: 20,
    description: 'Can be any format with up to 20 characters',
  })
  @MaxLength(20)
  toDate: string;
}
