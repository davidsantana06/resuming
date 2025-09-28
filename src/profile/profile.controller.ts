import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import ApiAuthProtected from 'src/auth/decorator/api-auth-protected.decorator';
import CurrentUser from 'src/auth/decorator/current-user.decorator';
import CurrentUserDto from 'src/auth/dto/current-user.dto';
import JwtAuthGuard from 'src/auth/guard/jwt-auth.guard';
import ApiCreatedResponses from 'src/common/decorator/api-created-responses.decorator';
import ProfileService from './profile.service';
import ProfileDto from './dto/profile.dto';
import ProfileEntity from './entity/profile.entity';

@ApiTags('profile')
@ApiAuthProtected()
@UseGuards(JwtAuthGuard)
@Controller('api/profile')
export default class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({
    summary: 'Create a profile',
    description: 'Creates a profile, available only when signed in',
  })
  @ApiBody({ type: ProfileDto })
  @ApiCreatedResponses({ type: ProfileEntity })
  @ApiResponse({ status: 409, description: 'Handle already in use' })
  @ApiResponse({ status: 422, description: 'Profile limit exceeded' })
  @Post()
  async create(@CurrentUser() user: CurrentUserDto, @Body() dto: ProfileDto) {
    return await this.profileService.create(user.id, dto);
  }

  @ApiOperation({
    summary: 'Get profile',
    description: 'Returns your profile, available only when signed in',
  })
  @ApiResponse({ status: 200, description: 'Success', type: ProfileEntity })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  @Get()
  async getUnique(@CurrentUser() user: CurrentUserDto) {
    return await this.profileService.getUnique({ userId: user.id });
  }

  @ApiOperation({
    summary: 'Update profile',
    description: 'Updates your profile, available only when signed in',
  })
  @ApiBody({ type: ProfileDto })
  @ApiResponse({ status: 200, description: 'Success', type: ProfileEntity })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  @ApiResponse({ status: 409, description: 'Handle already in use' })
  @Put()
  async update(@CurrentUser() user: CurrentUserDto, @Body() dto: ProfileDto) {
    return await this.profileService.update(user.id, dto);
  }

  @ApiOperation({
    summary: 'Delete profile',
    description: 'Deletes your profile, available only when signed in',
  })
  @ApiResponse({ status: 200, description: 'Success', type: ProfileEntity })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  @Delete()
  async delete(@CurrentUser() user: CurrentUserDto) {
    return await this.profileService.delete(user.id);
  }

  @ApiOperation({
    summary: 'Upload a profile picture',
    description:
      'Uploads a picture to your profile, available only when signed in',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      description: 'The picture file to upload',
      required: ['file'],
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    example: {
      message:
        'Picture uploaded successfully as 1cefffcf-ddd7-4e8a-8406-dd10d89f8060.png',
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid file' })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(201)
  @Post('upload-picture')
  async uploadPicture(
    @CurrentUser() user: CurrentUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { picture } = await this.profileService.uploadPicture(user.id, file);
    return { message: `Picture uploaded successfully as ${picture}` };
  }
}
