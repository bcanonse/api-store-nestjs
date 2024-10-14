import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from '../service/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Get()
  @HttpCode(HttpStatus.ACCEPTED)
  getProducts(
    @Query('limit') limit: number = 100,
    @Query('offset') offset: number = 0,
    @Query('brand') brand: string,
  ) {
    // return `products: limit => ${limit}, offset => ${offset}, brand => ${brand}`;
    return this.service.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: any) {
    return this.service.update(+id, payload);
  }
}
