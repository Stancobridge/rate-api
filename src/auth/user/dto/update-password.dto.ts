import { IsOptional, IsString } from 'class-validator';
import { IsValidPassword } from '../../../decorators';
import { Match } from '../decorators';

export class UpdateUserPasswordDto {
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
}
