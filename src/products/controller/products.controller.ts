import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from '../service/products.service';
import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { FilterProductsDto } from '../dto/filter-product.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';

@UseGuards(RolesGuard)
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Get(':id')
  async getProduct(@Param('id', ParseIntPipe) id: number) {
    return await this.service.findOne(id);
  }

  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  async getProducts(@Query() params: FilterProductsDto) {
    // return `products: limit => ${limit}, offset => ${offset}, brand => ${brand}`;
    return await this.service.findAll(params);
  }

  @Roles(UserRole.Admin)
  @Post()
  async create(@Body() product: CreateProductDto) {
    return await this.service.create(product);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return await this.service.update(id, payload);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.service.delete(id);
  }

  @Delete(':id/category/:categoryId')
  async deleteByCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return await this.service.removeCategoryByProduct(
      id,
      categoryId,
    );
  }

  @Put(':id/category/:categoryId')
  async addCategoryToProduct(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return await this.service.addCategoryToProduct(
      id,
      categoryId,
    );
  }
}
