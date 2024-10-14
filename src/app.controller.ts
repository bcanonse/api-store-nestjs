import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //Todas las rutas estaticas deben de ir primero y luego colocar las rutas dinamicas para evitar colisiones con las rutas.

  @Get('products/:id')
  getProduct(@Param('id') id: string) {
    return `Product with id ${id}`;
  }

  @Get('categories/:id/products/:productId')
  getCategory(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ) {
    return `Category with id ${id} of producto with id: ${productId}`;
  }

  @Get('products')
  getProducts(
    @Query('limit') limit: number = 100,
    @Query('offset') offset: number = 0,
    @Query('brand') brand: string,
  ) {
    return `products: limit => ${limit}, offset => ${offset}, brand => ${brand}`;
  }
}
