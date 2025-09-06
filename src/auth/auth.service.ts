import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import UserService from 'src/user/user.service';
import AuthPayloadDto from './dto/auth-payload.dto';
import SignInDto from './dto/sign-in.dto';
import InvalidCredentialsException from './exception/invalid-credentials.exception';

@Injectable()
export default class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signIn(dto: SignInDto): Promise<AuthPayloadDto> {
    const { email, password } = dto;

    const user = await this.userService.findUnique({ email });

    const validatePassword = () => bcrypt.compare(password, user!.password);
    const invalidCredentials = !user || !(await validatePassword());
    if (invalidCredentials) throw new InvalidCredentialsException();

    const accessToken = this.jwtService.sign({ sub: user.id });
    const expirationDate = this.calculateExpirationDate();

    return { accessToken, expiresAt: expirationDate };
  }

  private calculateExpirationDate(): Date {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    return expirationDate;
  }
}
