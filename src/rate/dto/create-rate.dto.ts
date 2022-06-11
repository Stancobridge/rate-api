import { IsDateString, IsString } from 'class-validator';

export class CreateRateDto {
  // Crypto Name
  @IsString()
  crypto_name: string;

  // Crypto Buy Rate
  @IsString()
  buy_rate: string;

  // Crypto Sell Rate
  @IsString()
  sell_rate: string;

  // Crypto Date Rate
  @IsDateString()
  date: Date;
}
