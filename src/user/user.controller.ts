import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entity/user.entity';

@ApiTags('user')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Create a user',
    description: 'Creates a new user account',
  })
  @ApiBody({ type: UserDto })
  @ApiResponse({ status: 201, description: 'Success', type: UserEntity })
  @ApiResponse({ status: 409, description: 'E-mail is already in use' })
  @Post()
  async create(@Body() dto: UserDto) {
    return await this.userService.create(dto);
  }
}
