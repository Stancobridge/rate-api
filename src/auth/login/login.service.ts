import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../../database';

@Injectable()
export class LoginService {
  @Inject(JwtService)
  private readonly jwt: JwtService;

  async login(user: IUser, headers: any) {
    // get user agent

    // generate token
    const token = this.jwt.sign({ email: user.email });
    return { user, auth_token: token };
  }

  findAll() {
    return `This action returns all login`;
  }

  findOne(id: number) {
    return `This action returns a #${id} login`;
  }

  remove(id: number) {
    return `This action removes a #${id} login`;
  }
}
