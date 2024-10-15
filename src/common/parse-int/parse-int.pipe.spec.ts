import {
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ParseIntPipe } from './parse-int.pipe';

describe('ParseIntPipe', () => {
  let pipe: ParseIntPipe;

  beforeEach(() => {
    pipe = new ParseIntPipe();
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  it('should transform a valid numeric string into an integer', () => {
    const value = '42';
    const metadata = {} as ArgumentMetadata;
    const expectedOutput = 42;
    const result = pipe.transform(value, metadata);

    expect(result).toEqual(expectedOutput);
  });

  it('should throw a BadRequestException for an invalid numeric string', () => {
    const value = 'invalid';
    const metadata = {} as ArgumentMetadata;

    expect(() => {
      pipe.transform(value, metadata);
    }).toThrow(BadRequestException);
  });
});
