import { IBase } from '../base';

export interface IRate extends IBase {
  crypto_name: string;
  buy_rate: string;
  sell_rate: string;
  date: string;
  deleted_at: Date;
}
