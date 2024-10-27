import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateOrderProductDto {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  public readonly orderId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  public readonly productId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  public readonly quantity: number;
}
