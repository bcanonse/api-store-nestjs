import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';

export class Order {
  public date: Date;
  public user: User;
  public products: Product[];
}
