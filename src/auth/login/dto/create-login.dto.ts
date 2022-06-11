import { IsDate, IsUUID } from 'class-validator';

export class CreateLoginDto {
  // User's last login date
  @IsDate()
  last_login: Date;

  // User's id
  @IsUUID()
  user_id: string;

  // User's location id
  @IsUUID()
  location_id: string;

  // User's device id
  @IsUUID()
  device_id: string;
}
