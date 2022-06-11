import { IsString } from 'class-validator';
import { Match } from '../../user/decorators/match.decorator';

export class ChangePasswordDto {
  // User's new Password
  @IsString()
  password: string;

  // User's confirm password
  @IsString()
  @Match('password', { message: 'Confirm password did not match' })
  confirm_password: string;
}
