import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';

@Module({
  imports: [AuthModule, ConfigModule.forRoot({ isGlobal: true }), UserModule],
  controllers: [AppController],
})
export class AppModule {}
