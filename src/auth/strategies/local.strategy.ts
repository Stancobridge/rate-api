import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { IUser } from '../../database';
import { UtilService } from '../../utils';
import { UserRepository } from '../user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  @Inject(UserRepository)
  private readonly userRepository: UserRepository;

  @Inject(UtilService)
  private readonly utilService: UtilService;
  constructor() {
    super({
      usernameField: 'email',
    });
  }
  async validate(email: string, password: string): Promise<IUser> {
    // check if user exists
    const user: IUser = await this.userRepository.findOne({ email });

    if (!user) {
      throw new NotFoundException('User with the email address not found');
    }

    // verify the user password is valid
    const isPasswordCorrect = await this.utilService.comparePassword(
      password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new ConflictException('Incorrect password');
    }

    if (!user.is_active) {
      throw new UnauthorizedException('Account not yet activated');
    }
    // delete user's password
    delete user.password;
    // return the authenticated user to the request
    return user;
  }
}
