import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { CurrentUserDto } from 'src/auth/dto/current-user.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ProfileService } from './profile.service';
import { ProfileDto } from './dto/profile.dto';
import { ProfileEntity } from './entity/profile.entity';

@ApiTags('profile')
@Controller('api/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({
    summary: 'Create a profile',
    description: 'Creates a profile, available only when signed in',
  })
  @ApiBearerAuth('accessToken')
  @ApiBody({ type: ProfileDto })
  @ApiResponse({ status: 201, description: 'Success', type: ProfileEntity })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 409, description: 'Handle is already in use' })
  @ApiResponse({ status: 429, description: 'Profile limit exceeded' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@CurrentUser() user: CurrentUserDto, @Body() dto: ProfileDto) {
    return await this.profileService.create(user.id, dto);
  }

  @ApiOperation({
    summary: 'Get profile',
    description: 'Returns your profile, available only when signed in',
  })
  @ApiBearerAuth('accessToken')
  @ApiResponse({ status: 200, description: 'Success', type: [ProfileEntity] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findManyByUserId(@CurrentUser() user: CurrentUserDto) {
    return await this.profileService.getUnique({ userId: user.id });
  }

  @ApiOperation({
    summary: 'Update profile',
    description: 'Updates your profile, available only when signed in',
  })
  @ApiBearerAuth('accessToken')
  @ApiBody({ type: ProfileDto })
  @ApiResponse({ status: 200, description: 'Success', type: ProfileEntity })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  @ApiResponse({ status: 409, description: 'Handle is already in use' })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@CurrentUser() user: CurrentUserDto, @Body() dto: ProfileDto) {
    return await this.profileService.update(user.id, dto);
  }

  @ApiOperation({
    summary: 'Upload a profile picture',
    description:
      'Uploads a picture to your profile, available only when signed in',
  })
  @ApiBearerAuth('accessToken')
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
    type: ProfileEntity,
  })
  @ApiResponse({ status: 400, description: 'Image invalid' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post(':id/picture')
  async uploadPicture(
    @CurrentUser() user: CurrentUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.profileService.updatePicture(user.id, file);
  }

  @ApiOperation({
    summary: 'Delete profile',
    description: 'Deletes your profile, available only when signed in',
  })
  @ApiBearerAuth('accessToken')
  @ApiResponse({ status: 200, description: 'Success', type: ProfileEntity })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@CurrentUser() user: CurrentUserDto) {
    return await this.profileService.delete(user.id);
  }
}
