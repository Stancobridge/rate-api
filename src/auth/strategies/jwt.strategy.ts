import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvironmentService } from '../../configs';
import { UserModel } from '../../database';
import { UserRepository } from '../user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  @Inject(UserRepository)
  private userRepository: UserRepository;

  // Convifgure the JWT TOKEN to be gotten from the Authorization header
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: EnvironmentService.getValue('JWT_SECRET'),
    });
  }

  async validate({ email }: any): Promise<Omit<UserModel, 'password'>> {
    const user = await this.userRepository.findOne({
      email,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    delete user.password;

    return user;
  }
}
