import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
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

  update(id: number, payload: any) {
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
