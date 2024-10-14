import { Controller, Get, Param } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get(':id/products/:productId')
  getCategory(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ) {
    return `Category with id ${id} of producto with id: ${productId}`;
  }
}
