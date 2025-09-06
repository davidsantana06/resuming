import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_SECRET } from 'src/environments';
import CurrentUserDto from '../dto/current-user.dto';
import JwtPayloadDto from '../dto/jwt-payload.dto';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKey: JWT_SECRET!,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  override validate(payload: JwtPayloadDto): CurrentUserDto {
    return { id: payload.sub };
  }
}
