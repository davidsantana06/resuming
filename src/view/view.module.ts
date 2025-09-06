import { Module } from '@nestjs/common';
import ViewService from './view.service';

@Module({
  providers: [ViewService],
  exports: [ViewService],
})
export default class ViewModule {}
