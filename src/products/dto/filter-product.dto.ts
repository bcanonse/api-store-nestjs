import {
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';

export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  public readonly limit: number;

  @IsOptional()
  @Min(0)
  public readonly offset: number;
}
