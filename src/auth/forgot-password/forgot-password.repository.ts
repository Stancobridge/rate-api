import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../base';
import { PasswordResetModel } from '../../database';

@Injectable()
export class ForgotPasswordRepository extends BaseRepository {
  constructor() {
    super(PasswordResetModel);
  }
}
