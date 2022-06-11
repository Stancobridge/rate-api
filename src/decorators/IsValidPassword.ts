import {
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

@ValidatorConstraint({ async: true })
@Injectable()
export class IsValidPasswordConstraint implements ValidatorConstraintInterface {
  async validate(value: string) {
    try {
      const pattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=(.*?\d){2})(?=.*[-+_!@#$%^&*.,?]).+$/;
      return pattern.test(value);
    } catch (e) {
      throw new InternalServerErrorException({
        message: e.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return `Invalid Password`;
  }
}

export function IsValidPassword(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsValidPasswordConstraint,
    });
  };
}
