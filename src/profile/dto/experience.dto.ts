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
      'Taught Information Systems students key Java concepts such as exceptions, ' +
      'threads, generics, collections, I/O, and JavaFX, and provided support with ' +
      'assignments, academic projects, and exams.',
    minLength: 3,
    maxLength: 500,
    description: 'Must have between 3 and 500 characters',
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(500)
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
