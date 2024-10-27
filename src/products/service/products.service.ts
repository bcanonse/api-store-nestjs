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
import { FilterProductsDto } from '../dto/filter-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly brandsService: BrandsService,
    private readonly categoriesService: CategoriesService,
  ) {}

  private throwNotFoundProduct(
    data: any,
    isSingular = true,
  ) {
    const singularMessage = isSingular
      ? 'product'
      : 'products';
    throw new NotFoundException(
      `The ${singularMessage} ${data} not found`,
    );
  }

  private getOptionsQuery(withRelations: boolean) {
    return withRelations
      ? {
          relations: ['brand', 'categories'],
        }
      : undefined;
  }

  async removeCategoryByProduct(
    productId: number,
    categoryId: number,
  ) {
    const product = await this.productsRepository.findOne({
      where: { id: productId },
      relations: ['categories'],
    });

    if (!product) this.throwNotFoundProduct(productId);

    product.categories = product.categories?.filter(
      (category) => category.id !== categoryId,
    );

    return await this.productsRepository.save(product);
  }

  async addCategoryToProduct(
    productId: number,
    categoryId: number,
  ) {
    const product = await this.productsRepository.findOne({
      where: { id: productId },
      relations: ['categories'],
    });

    if (!product) this.throwNotFoundProduct(productId);

    const category = await this.categoriesService.findOne(
      categoryId,
      false,
    );

    product.categories.push(category);

    return await this.productsRepository.save(product);
  }

  async findAll(
    params?: FilterProductsDto,
  ): Promise<Product[]> {
    const { limit, offset } = params;
    console.log(limit, offset);
    return await this.productsRepository.find({
      relations: ['brand'],
      // para enviar el limit, lo hacemos en la propiedad "take"
      take: limit,
      // para enviar el offset, lo hacemos en la propiedad "skip"
      skip: offset,
    });
  }

  async findOne(
    id: number,
    withRelations = true,
  ): Promise<Product | null> {
    // const product = await this.productsRepository.findOneBy(
    //   { id: id },
    // );

    const options = this.getOptionsQuery(withRelations);

    const product = await this.productsRepository.findOne({
      where: { id },
      ...options,
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

    const { brandId, categoriesId } = payload;
    if (brandId) {
      const brand =
        await this.brandsService.findOne(brandId);

      product.brand = brand;
    }

    if (categoriesId) {
      const categories =
        await this.categoriesService.findByIds(
          categoriesId,
        );
      product.categories = categories;
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
