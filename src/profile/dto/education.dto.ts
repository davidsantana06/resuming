import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export default class EducationDto {
  @ApiProperty({
    title: 'Course',
    example: "Bachelor's Degree in Information Systems",
    minLength: 3,
    maxLength: 50,
    description: 'Must have between 3 and 50 characters',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  course: string;

  @ApiPropertyOptional({
    title: 'Institution',
    example: 'Federal Institute of Education, Science and Technology of Bahia',
    minLength: 3,
    maxLength: 100,
    description: 'Must have between 3 and 100 characters',
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  institution?: string;

  @ApiProperty({
    title: 'From Date',
    example: 'Mai. 2021',
    maxLength: 20,
    description: 'Can be any format with up to 20 characters',
  })
  @IsString()
  @MaxLength(20)
  fromDate: string;

  @ApiProperty({
    title: 'To Date',
    example: 'Present',
    maxLength: 20,
    description: 'Can be any format with up to 20 characters',
  })
  @MaxLength(20)
  toDate: string;
}
