import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base';
import { RateModel } from '../database/models/rates';

@Injectable()
export class RateRepository extends BaseRepository {
  constructor() {
    super(RateModel);
  }
}
