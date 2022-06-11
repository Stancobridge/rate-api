import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import knex from 'knex';
import * as knexConfig from '../../knexfile';

@ValidatorConstraint({ async: true })
@Injectable()
export class ExistInConstraint implements ValidatorConstraintInterface {
  private model: any;
  constructor() {
    this.model = knex(knexConfig);
  }

  async validate(value: string | number, args: ValidationArguments) {
    const [table, column] = args.constraints;
    try {
      // confirm that column was cofigure
      if (!column) {
        throw new HttpException(
          `column most be added first to use existsIn decorator`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      // confirm that table was cofigure
      if (!table) {
        throw new HttpException(
          `table most be added first to use existsIn decorator`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      // validate the value was sent
      if (!value) {
        throw new ConflictException(`${column} is required`);
      }
      // set table to use for checking the if the entity exists

      const entityExists = await this.model(`${table}`)
        .select()
        .where(column, value)
        .first();

      return entityExists ? true : false;
    } catch (e) {
      throw new InternalServerErrorException({
        message: e.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    const [column] = args.constraints;
    return `${column} not found`;
  }
}

export function ExistsIn(table, column, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [table, column],
      validator: ExistInConstraint,
    });
  };
}
