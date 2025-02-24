import { Controller, Get, Param, Render } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profile/profile.service';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly profileService: ProfileService) {}

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
  @ApiResponse({ status: 404, description: 'Profile not found' })
  @Render('resume')
  @Get(':profileHandle')
  async renderResume(@Param('profileHandle') profileHandle: string) {
    const profile = await this.profileService.getUnique({
      handle: profileHandle,
    });
    return { ...profile };
  }
}
