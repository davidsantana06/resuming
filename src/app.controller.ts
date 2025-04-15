import { Controller, Get, Param, Query, Render, Res } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ViewService } from './view/view.service';
import { ProfileService } from './profile/profile.service';

@ApiTags('app')
@ApiResponse({ status: 404, description: 'Profile not found' })
@Controller()
export class AppController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly viewService: ViewService,
  ) {}

  @ApiOperation({
    summary: 'Render a resume',
    description: 'Renders the resume for the given profile handle',
  })
  @ApiParam({
    name: 'profileHandle',
    type: 'string',
    description: 'The profile handle',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    content: {
      'text/html': {
        schema: {
          type: 'string',
          example: '<html lang="en" data-theme="dark">...</html>',
        },
      },
    },
  })
  @Render('resume-v1')
  @Get(':profileHandle')
  async renderResume(@Param('profileHandle') profileHandle: string) {
    const profile = await this.profileService.getUnique({
      handle: profileHandle,
    });
    return { ...profile, exportFormats: ['pdf', 'png'] };
  }

  @ApiOperation({
    summary: 'Export a resume',
    description:
      'Exports the resume for the given profile handle as PDF or PNG file',
  })
  @ApiParam({
    name: 'profileHandle',
    type: 'string',
    description: 'The profile handle',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    content: {
      'application/pdf': {
        schema: {
          type: 'string',
          format: 'binary',
          example: 'JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnk...',
        },
      },
      'application/png': {
        schema: {
          type: 'string',
          format: 'binary',
          example: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAY...',
        },
      },
    },
  })
  @ApiQuery({
    name: 'format',
    enum: ['pdf', 'png'],
    description: 'The file format',
    required: true,
  })
  @Get(':profileHandle/export')
  async exportResume(
    @Param('profileHandle') profileHandle: string,
    @Query('format') format: 'pdf' | 'png',
    @Res() res: Response,
  ) {
    const { name, ...rest } = await this.profileService.getUnique({
      handle: profileHandle,
    });

    const buffer = await this.viewService.export(
      'resume-v2',
      { name, ...rest },
      format,
    );
    const filename = `${encodeURIComponent(name)}.${format}`;

    res.set({
      'Content-Type': `application/${format}`,
      'Content-Disposition': `attachment; filename*=UTF-8''${filename}`,
    });
    res.send(buffer);
  }
}
