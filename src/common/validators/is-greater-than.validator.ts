// src/common/IsGreaterThan.validator.ts
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsGreaterThan(
  property: string, // Propiedad con la que se va a comparar (minPrice)
  defaultValue: number, // Valor por defecto (en caso de que no haya un minPrice, por ejemplo)
  validationOptions?: ValidationOptions,
) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isGreaterThan',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue =
            (args.object as any)[relatedPropertyName] ||
            defaultValue;
          return (
            typeof value === 'number' &&
            typeof relatedValue === 'number' &&
            value > relatedValue
          );
        },
      },
    });
  };
}
