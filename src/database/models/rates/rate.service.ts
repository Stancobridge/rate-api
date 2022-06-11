import { JSONSchema } from 'objection';
import { DatabaseTable } from '../../database.tables';
import { BaseModel } from '../base';
import { IRate } from './rate.interface';
import { RateValidation } from './rate.validation';

export class RateModel extends BaseModel implements IRate {
  public id: IRate['id'];
  public crypto_name: IRate['crypto_name'];
  public buy_rate: IRate['buy_rate'];
  public sell_rate: IRate['sell_rate'];
  public date: IRate['date'];
  public created_at: IRate['created_at'];
  public updated_at: IRate['updated_at'];
  public deleted_at: IRate['deleted_at'];

  static get tableName() {
    return `${DatabaseTable.rates}`;
  }

  static get jsonSchema(): JSONSchema {
    return RateValidation;
  }

  static get relationMappings() {
    return {};
  }
}
