import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const pattern = /^\d+$/;

    if (!pattern.test(value))
      throw new BadRequestException(
        `The value ${value} is not a integer`,
      );

    // return parseInt(value, 10);
    return Number(value);
  }
}
