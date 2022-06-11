import { ConflictException } from '@nestjs/common';
import { PartialType } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateIf,
} from 'class-validator';
import { IsValidPassword } from '../../../decorators/IsValidPassword';
import { IsZipCode } from '../../../decorators/IsZipCode';
import { Match } from '../decorators';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  /**
   * User's gender
   */
  @IsEnum(['male', 'female', 'other'], {
    message: 'Invalid Gender',
  })
  gender: string;

  /**
   * User's marital status
   */
  @IsEnum(['married', 'single', 'divorced', 'other'], {
    message: 'Invalid marital status',
  })
  marital_status: string;

  /**
   * User's date of birth
   */
  @IsDateString()
  dob: Date;

  /**
   * User's address
   */
  @IsString()
  address: string;

  /**
   * User's address zip code
   */
  @IsString()
  @IsZipCode('NG')
  zip_code: string;

  /**
   * User's address city
   */
  @IsString()
  city: string;

  /**
   * User's address state
   */
  @IsString()
  state: string;

  /**
   * User's address country
   */
  @IsString()
  country: string;

  /**
   * User's password
   */
  @IsString()
  @IsOptional()
  @ValidateIf((o) => {
    if (o.password && !o.confirm_password) {
      throw new ConflictException('Confirm password is required');
    }
    return true;
  })
  @IsValidPassword({
    message: 'Password failed requirements',
  })
  password: string;

  // User's confirm password
  @IsOptional()
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
  @IsOptional()
  email: string;

  /**
   * User's first name
   */
  @IsOptional()
  @IsString({ message: 'First Name Is Required' })
  first_name: string;

  /**
   * User's last name
   */
  @IsOptional()
  @IsString({ message: 'Last Name Is Required' })
  last_name: string;
}
