import { Body, Controller, Delete, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import CurrentUser from 'src/auth/decorator/current-user.decorator';
import CurrentUserDto from 'src/auth/dto/current-user.dto';
import JwtAuthGuard from 'src/auth/guard/jwt-auth.guard';
import ApiAuthProtected from 'src/swagger/decorator/api-auth-protected.decorator';
import ApiCreatedResponses from 'src/swagger/decorator/api-created-responses.decorator';
import ApiDeletedResponses from 'src/swagger/decorator/api-deleted-responses.decorator';
import ApiUpdatedResponses from 'src/swagger/decorator/api-updated-responses.decorator';
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
  @ApiResponse({ status: 409, description: 'Email already in use' })
  @Post()
  async create(@Body() dto: UserDto) {
    return await this.userService.create(dto);
  }

  @ApiAuthProtected()
  @ApiOperation({
    summary: 'Update user',
    description: 'Updates your user credentials, available only when signed in',
  })
  @ApiBody({ type: UserDto })
  @ApiUpdatedResponses({ type: UserEntity, entityName: 'User' })
  @ApiResponse({ status: 409, description: 'Email already in use' })
  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@CurrentUser() user: CurrentUserDto, @Body() dto: UserDto) {
    return await this.userService.update(user.id, dto);
  }

  @ApiAuthProtected()
  @ApiOperation({
    summary: 'Delete user',
    description: 'Deletes your user account, available only when signed in',
  })
  @ApiDeletedResponses({ type: UserEntity, entityName: 'User' })
  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@CurrentUser() user: CurrentUserDto) {
    return await this.userService.delete(user.id);
  }
}
