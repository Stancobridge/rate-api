import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../base';
import { UserModel } from '../../database';

@Injectable()
export class UserRepository extends BaseRepository {
  updatedUser(id: string) {
    throw new Error('Method not implemented.');
  }
  constructor() {
    super(UserModel);
  }
}
