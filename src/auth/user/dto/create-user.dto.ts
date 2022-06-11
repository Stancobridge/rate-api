import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';
import { IsValidPassword } from '../../../decorators/IsValidPassword';
import { Match } from '../decorators/match.decorator';

export class CreateUserDto {
  /**
   * User's password
   */
  @IsString()
  @IsValidPassword({
    message: 'Password failed requirements',
  })
  password: string;

  // User's confirm password
  @IsString()
  @Match('password', { message: 'Confirm password did not match' })
  confirm_password: string;

  /**
   * User's phone number
   */
  @IsPhoneNumber('NG', { message: 'Phone number is not valid' })
  phone: string;

  /**
   * User's email address
   */
  @IsEmail({}, { message: 'Email is not valid' })
  email: string;
}
