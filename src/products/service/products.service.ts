import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { QueryFailedError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { BrandsService } from 'src/brands/service/brands.service';
import { CategoriesService } from 'src/categories/service/categories.service';

import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly brandsService: BrandsService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number): Promise<Product | null> {
    // const product = await this.productsRepository.findOneBy(
    //   { id: id },
    // );

    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['brand', 'categories'],
    });

    if (!product)
      throw new NotFoundException(
        `Product ${id} not found`,
      );

    return product;
  }

  async create(
    product: CreateProductDto,
  ): Promise<Product> {
    try {
      const newProduct =
        this.productsRepository.create(product);

      const { brandId, categoriesId } = product;
      if (brandId) {
        const brand = await this.brandsService.findOne(
          brandId,
          false,
        );

        newProduct.brand = brand;
      }

      if (categoriesId) {
        const categories =
          await this.categoriesService.findByIds(
            categoriesId,
          );
        newProduct.categories = categories;
      }

      return await this.productsRepository.save(newProduct);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        console.error(error.driverError?.detail);
        throw new HttpException(
          error.driverError?.detail,
          HttpStatus.CONFLICT,
        );
      }
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw error;
    }
  }

  async update(id: number, payload: UpdateProductDto) {
    const product = await this.findOne(id);

    const { brandId } = payload;
    if (brandId) {
      const brand =
        await this.brandsService.findOne(brandId);

      product.brand = brand;
    }

    this.productsRepository.merge(product, payload);

    return await this.productsRepository.save(product);
  }

  async delete(id: number) {
    const product = await this.findOne(id);

    if (!product)
      throw new NotFoundException(
        `Product ${id} not found`,
      );

    return this.productsRepository.delete(id);
  }
}
