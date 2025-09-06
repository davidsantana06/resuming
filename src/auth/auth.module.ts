import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWT_SECRET } from 'src/environments';
import UserModule from 'src/user/user.module';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import JwtStrategy from './strategy/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    JwtModule.register({
      secret: JWT_SECRET!,
      signOptions: { expiresIn: '7d' },
    }),
    PassportModule,
    UserModule,
  ],
  exports: [JwtStrategy],
})
export default class AuthModule {}
