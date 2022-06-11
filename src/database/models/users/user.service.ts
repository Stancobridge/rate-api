import { JSONSchema } from 'objection';
import { DatabaseTable } from '../../database.tables';
import { BaseModel } from '../base';
import { IUser } from './user.interface';
import { UserValidation } from './user.validation';

export class UserModel extends BaseModel implements IUser {
  public id: IUser['id'];
  public dob: IUser['dob'];
  public bvn: IUser['bvn'];
  public email: IUser['email'];
  public phone: IUser['phone'];
  public gender: IUser['gender'];
  public password: IUser['password'];
  public is_active: IUser['is_active'];
  public last_name: IUser['last_name'];
  public first_name: IUser['first_name'];
  public deleted_at: IUser['deleted_at'];
  public created_at: IUser['created_at'];
  public updated_at: IUser['updated_at'];
  public bvn_verified: IUser['bvn_verified'];
  public marital_status: IUser['marital_status'];
  public phone_verified: IUser['phone_verified'];
  public email_verified: IUser['email_verified'];
  public profile_pics: IUser['profile_pics'];

  static get tableName() {
    return `${DatabaseTable.users}`;
  }

  static get jsonSchema(): JSONSchema {
    return UserValidation;
  }

  static get relationMappings() {
    return {};
  }
}
