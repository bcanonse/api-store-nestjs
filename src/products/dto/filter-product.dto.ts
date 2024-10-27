import {
  IsOptional,
  IsPositive,
  Min,
  ValidateIf,
} from 'class-validator';

export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  public readonly limit: number;

  @IsOptional()
  @Min(0)
  public readonly offset: number;

  @IsOptional()
  @IsPositive()
  public readonly minPrice: number;

  @ValidateIf((item) => item.minPrice)
  // @IsGreaterThan('minPrice', 0, {
  //   message: 'Max price have to be greater than min price.',
  // })
  @IsPositive()
  public readonly maxPrice: number;
}
