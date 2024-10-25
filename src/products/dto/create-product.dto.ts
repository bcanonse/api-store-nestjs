import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MaxLength,
  IsPositive,
  IsArray,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsString()
  @MaxLength(200)
  public readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive({ message: 'El numero debe ser positivo' })
  public readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive({ message: 'El numero debe ser positivo' })
  public readonly stock: number;

  @IsUrl({}, { message: 'La URL no es valida' })
  public readonly image?: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive({ message: 'El numero debe ser positivo' })
  public readonly brandId: number;

  @IsArray({
    message: 'Es necesario los ids',
  })
  public readonly categoriesId: number[];
}
