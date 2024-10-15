import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductsService {
  private counter = 1;
  private products: Product[] = [
    { id: 1, name: 'Laptop', price: 10.5, stock: 19 },
  ];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find(
      (product) => product.id === id,
    );

    if (!product)
      throw new NotFoundException(
        `Product ${id} not found`,
      );

    return product;
  }

  create(product: CreateProductDto) {
    const newProduct = {
      id: this.counter + 1,
      ...product,
    };

    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateProductDto) {
    const product = this.findOne(id);
    if (product) {
      const index = this.products.findIndex(
        (item) => item.id === id,
      );
      this.products[index] = {
        ...product,
        ...payload,
      };
      return this.products[index];
    }
    return null;
  }

  delete(id: number) {
    const productIndex = this.products.findIndex(
      (item) => item.id === id,
    );

    if (productIndex === -1)
      throw new NotFoundException(
        `Product ${id} not found`,
      );

    this.products.splice(productIndex, 1);
    return true;
  }
}
