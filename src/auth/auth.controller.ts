import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import ApiCreatedResponses from 'src/common/decorator/api-created-responses.decorator';
import AuthService from './auth.service';
import AuthPayloadDto from './dto/auth-payload.dto';
import SignInDto from './dto/sign-in.dto';

@ApiTags('auth')
@Controller('api/auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Sign in',
    description:
      "Validates the user's credentials and returns a JWT token upon successful " +
      'authentication',
  })
  @ApiBody({ type: SignInDto })
  @ApiCreatedResponses({ type: AuthPayloadDto })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @Post('sign-in')
  async signIn(@Body() dto: SignInDto) {
    return await this.authService.signIn(dto);
  }
}
