import { plainToInstance } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';

// enum Environment {
//   Development = 'development',
//   Production = 'production',
//   Test = 'test',
//   Provision = 'provision',
// }

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

  @IsString()
  @IsNotEmpty()
  public readonly JWT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  public readonly JWT_EXPIRE_IN: string;

  @IsNumber()
  @IsPositive()
  @Min(0)
  @Max(65535)
  public readonly DB_PORT: number;

  @IsNumber()
  @IsPositive()
  @Min(0)
  @Max(65535)
  public readonly PORT: number;

  @IsString()
  @IsNotEmpty()
  public readonly POSTGRES_DB: string;

  @IsString()
  @IsNotEmpty()
  public readonly POSTGRES_USER: string;

  @IsString()
  @IsNotEmpty()
  public readonly POSTGRES_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  public readonly POSTGRES_HOST: string;

  @IsNumber()
  @IsPositive()
  @Min(5432)
  @Max(5500)
  public readonly POSTGRES_PORT: number;

  @IsString()
  @IsNotEmpty()
  public readonly DATABASE_URL: string;
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
