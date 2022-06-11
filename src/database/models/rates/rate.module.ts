import { Module } from '@nestjs/common';
import { RateModel } from './rate.service';

@Module({
  providers: [RateModel],
  exports: [RateModel],
})
export class DbRateModule {}
