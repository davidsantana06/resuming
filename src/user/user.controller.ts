import { Body, Controller, Delete, Post, Put, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import CurrentUser from 'src/auth/decorator/current-user.decorator';
import CurrentUserDto from 'src/auth/dto/current-user.dto';
import JwtAuthGuard from 'src/auth/guard/jwt-auth.guard';
import ApiCreatedResponses from 'src/common/decorator/api-created-responses.decorator';
import UserService from './user.service';
import UserDto from './dto/user.dto';
import UserEntity from './entity/user.entity';

@ApiTags('user')
@Controller('api/user')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Create a user',
    description: 'Creates a new user account',
  })
  @ApiBody({ type: UserDto })
  @ApiCreatedResponses({ type: UserEntity })
  @ApiResponse({ status: 409, description: 'E-mail already in use' })
  @Post()
  async create(@Body() dto: UserDto) {
    return await this.userService.create(dto);
  }

  @ApiOperation({
    summary: 'Update user',
    description: 'Updates your user credentials, available only when signed in',
  })
  @ApiBearerAuth('accessToken')
  @ApiBody({ type: UserDto })
  @ApiResponse({ status: 200, description: 'Success', type: UserEntity })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 409, description: 'E-mail already in use' })
  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@CurrentUser() user: CurrentUserDto, @Body() dto: UserDto) {
    return await this.userService.update(user.id, dto);
  }

  @ApiOperation({
    summary: 'Delete user',
    description: 'Deletes your user account, available only when signed in',
  })
  @ApiBearerAuth('accessToken')
  @ApiResponse({ status: 200, description: 'Success', type: UserEntity })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@CurrentUser() user: CurrentUserDto) {
    return await this.userService.delete(user.id);
  }
}
