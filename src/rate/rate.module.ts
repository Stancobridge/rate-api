import { Module } from '@nestjs/common';
import { RateRepository } from './rate-repository';
import { RateController } from './rate.controller';
import { RateService } from './rate.service';

@Module({
  controllers: [RateController],
  providers: [RateService, RateRepository],
})
export class RateModule {}
