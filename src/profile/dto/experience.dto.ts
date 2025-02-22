import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class ExperienceDto {
  @ApiProperty({
    title: 'Position',
    example: 'Backend Developer',
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
    example: 'Open Source Software Foundation',
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
      'Developed and maintained RESTful APIs using NestJS and TypeScript, ensuring ' +
      'scalability and high performance. Implemented authentication and authorization ' +
      'mechanisms with JWT and OAuth2. Designed and optimized PostgreSQL database ' +
      'schemas, wrote unit and integration tests with Jest, and contributed to open-source ' +
      'projects, collaborating with developers worldwide.',
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
    example: 'Jan. 2023',
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
