import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find();
  }

  async findOne(id: number): Promise<Product | null> {
    // const product = await this.productsRepository.findOneBy(
    //   { id: id },
    // );

    const product = await this.productsRepository.findOne({
      where: { id },
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
    const newProduct =
      this.productsRepository.create(product);

    return await this.productsRepository.save(newProduct);
  }

  async update(id: number, payload: UpdateProductDto) {
    const product = await this.findOne(id);

    if (!product) return null;

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
