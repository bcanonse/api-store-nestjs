import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

export class EnvironmentVariables {
  /* @IsEnum(Environment)
  public NODE_ENV: Environment;

  @IsNumber()
  @IsPort()
  @Min(0)
  @Max(65535)
  public PORT: number; */

  @IsString()
  @IsNotEmpty()
  public readonly DATABASE_NAME: string;

  @IsString()
  @IsNotEmpty()
  public readonly API_KEY: string;

  @IsNumber()
  @IsPositive()
  @Min(0)
  @Max(65535)
  public readonly DB_PORT: number;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(
    EnvironmentVariables,
    config,
    { enableImplicitConversion: true },
  );
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
