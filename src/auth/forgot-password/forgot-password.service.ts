import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IPasswordReset, IUser } from '../../database';
import { UtilService } from '../../utils';
import { UserRepository } from '../user';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { IForgotPasswordToken } from './forgot-password.interface';
import { ForgotPasswordRepository } from './forgot-password.repository';

@Injectable()
export class ForgotPasswordService {
  // Dependencies of this module
  @Inject(JwtService)
  private readonly jwt: JwtService;
  @Inject(UserRepository)
  private readonly userRepository: UserRepository;
  @Inject(UtilService)
  private readonly utilService: UtilService;
  @Inject(ForgotPasswordRepository)
  private readonly forgotPasswordRepository: ForgotPasswordRepository;

  public async sendForgotPasswordToken({ email }: ForgotPasswordDto) {
    // validate user exists
    const user = await this.isUserExists({ email });

    //generate token
    const token = await this.generateToken(user);

    // Todo: send email to user email using the Notification service
    // try {
    //   await this.notificationServicesService.notify({
    //     fullname: `${user.last_name} ${user.first_name}`,
    //     phone: user.phone,
    //     email: user.email,
    //     user_id: user.id,
    //     subject: 'Zigah Reset Password Link',
    //     message: `You requested for password reset, click the below link to reset your password https://zigah.co/auth?verify=${token.token}`,
    //     service_name: 'account service',
    //     is_mail: true,
    //     is_sms: false,
    //   });
    // } catch (e) {
    //   await this.rollBackForgotPassword(token);
    //   throw new InternalServerErrorException(
    //     `Error sending forgot password notification: ${e.message}`,
    //   );
    // }

    delete token.token;
    delete token.user_id;
    delete token.used;
    // return  success message
    return { email, token };
  }

  // Generate JWT Token to use for email validation
  public async generateToken(user: IUser) {
    // generate signed token
    const token = this.jwt.sign({ email: user.email });

    // insert token inside database and return it
    return this.forgotPasswordRepository.create({
      token,
      user_id: user.id,
    });
  }

  public validateToken(token: string): IForgotPasswordToken {
    try {
      this.jwt.verify(token);
      const isTokenValid = this.jwt.decode(token) as IForgotPasswordToken;
      // return error if password link is invalid
      if (!isTokenValid) {
        throw new ForbiddenException('Invalid or expired forgot password link');
      }
      return isTokenValid;
    } catch (e) {
      throw new ForbiddenException('Token Expired');
    }
  }

  public async resetPasswordWithToken(
    changePasswordDto: ChangePasswordDto,
    token: string,
  ) {
    // validate token
    const { email } = this.validateToken(token);

    // get the user to update this password
    let user = await this.isUserExists({ email });

    // validate that token is owned by this user
    await this.validUserToken(user, token);

    // hash password
    const userNewPassword = await this.utilService.hashPassword(
      changePasswordDto.password,
    );

    // update user password
    user = await this.userRepository.update(user.id, {
      password: userNewPassword,
    });

    delete user.password;

    return { user };
  }

  public async isUserExists(data: object): Promise<IUser> {
    // get the user to update this password
    const user = await this.userRepository.findOne(data);
    if (!user) {
      throw new NotFoundException('User with this email not found');
    }
    return user;
  }

  private async validUserToken(user: IUser, token: string) {
    // check if this token has been used
    const forgotPassword = (await this.forgotPasswordRepository.findOne({
      token,
      user_id: user.id,
    })) as IPasswordReset;

    if (!forgotPassword) {
      throw new ConflictException('Invalid token');
    }

    // validate that user owns this token
    if (user.id !== forgotPassword.user_id) {
      throw new ForbiddenException('Invalid operation');
    }

    // make sure token has not been used
    if (forgotPassword.used) {
      throw new ConflictException('This token has been used');
    } else {
      // update this token
      await this.forgotPasswordRepository.update(forgotPassword.id, {
        used: true,
      });
    }

    return forgotPassword;
  }

  private async rollBackForgotPassword(forgotPassword: IPasswordReset) {
    await this.forgotPasswordRepository.delete(forgotPassword.id);
  }
}
