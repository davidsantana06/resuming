import { Controller, Get, Param, Render, Res } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import ViewService from './view/view.service';
import ProfileService from './profile/profile.service';

@ApiTags('app')
@ApiResponse({ status: 404, description: 'Profile not found' })
@Controller()
export default class AppController {
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
    return { ...profile };
  }

  @ApiOperation({
    summary: 'Export a resume',
    description: 'Exports the resume for the given profile handle as PDF',
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
    },
  })
  @Get(':profileHandle/export')
  async exportResume(
    @Param('profileHandle') profileHandle: string,
    @Res() res: Response,
  ) {
    const { name, ...rest } = await this.profileService.getUnique({
      handle: profileHandle,
    });

    const buffer = await this.viewService.export('resume-v2', {
      name,
      ...rest,
    });
    const filename = `${encodeURIComponent(name)}.pdf`;

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename*=UTF-8''${filename}`,
    });
    res.send(buffer);
  }
}
