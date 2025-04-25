import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { CredentialsInvalidException } from './auth.exception';
import { AuthPayloadDto } from './dto/auth-payload.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  private calculateExpirationDate(): Date {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    return expirationDate;
  }

  async singIn(dto: SignInDto): Promise<AuthPayloadDto> {
    const { email, password } = dto;

    const user = await this.userService.findUnique({ email });

    const isCredentialsInvalid =
      !user || !(await bcrypt.compare(password, user.password));
    if (isCredentialsInvalid) throw new CredentialsInvalidException();

    const accessToken = this.jwtService.sign({ sub: user.id });

    const expirationDate = this.calculateExpirationDate();

    return { accessToken, expiresAt: expirationDate };
  }
}
