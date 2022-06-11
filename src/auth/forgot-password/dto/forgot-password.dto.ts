import { IsEmail, IsNotEmpty } from 'class-validator';
import { DatabaseTable } from '../../../database';
import { ExistsIn } from '../../../decorators/ExistsIn';

export class ForgotPasswordDto {
  // User email
  @ExistsIn(DatabaseTable.users, 'email', {
    message: 'User with this email not found',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
