import { JSONSchema } from 'objection';
import { DatabaseTable } from '../../database.tables';
import { BaseModel } from '../base';
import { IPasswordReset } from './passwordReset.interface';
import { PasswordResetValidation } from './passwordReset.validation';

export class PasswordResetModel extends BaseModel implements IPasswordReset {
  public id: IPasswordReset['id'];
  public token: IPasswordReset['token'];
  public user_id: IPasswordReset['user_id'];
  public created_at: IPasswordReset['created_at'];
  public updated_at: IPasswordReset['updated_at'];
  public used: IPasswordReset['used'];

  static get tableName() {
    return `${DatabaseTable.password_resets}`;
  }

  static get jsonSchema(): JSONSchema {
    return PasswordResetValidation;
  }

  static get relationMappings() {
    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: `../users`,
        join: {
          from: `${DatabaseTable.password_resets}.user_id`,
          to: `${DatabaseTable.users}.id`,
        },
      },
    };
  }
}
