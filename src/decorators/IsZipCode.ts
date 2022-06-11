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
import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from 'postcode-validator';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsZipCodeConstraint implements ValidatorConstraintInterface {
  async validate(value: string, args: ValidationArguments) {
    const [countryCode] = args.constraints;
    try {
      if (!postcodeValidatorExistsForCountry('NG')) {
        throw new InternalServerErrorException(
          `${countryCode} not a valid country code`,
        );
      }
      return postcodeValidator(value, countryCode);
    } catch (e) {
      throw new InternalServerErrorException({
        message: e.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return `Invalid country code`;
  }
}

export function IsZipCode(
  countryCode: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [countryCode],
      validator: IsZipCodeConstraint,
    });
  };
}
