import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import AuthModule from './auth/auth.module';
import ProfileModule from './profile/profile.module';
import UserModule from './user/user.module';
import ViewModule from './view/view.module';
import AppController from './app.controller';

@Module({
  imports: [
    AuthModule,
    ProfileModule,
    UserModule,
    ViewModule,
    CommonModule,
  ],
  controllers: [AppController],
})
export default class AppModule {}
