import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/module/categories.module';
import { ProductsModule } from './products/module/products.module';
import { UsersModule } from './users/module/users.module';
import { OrdersModule } from './orders/module/orders.module';
import { CustomersModule } from './customers/module/customers.module';
import { BrandsModule } from './brands/module/brands.module';

const API_KEY = 'KKS404K3Mjsd432';

@Module({
  imports: [
    CategoriesModule,
    ProductsModule,
    UsersModule,
    OrdersModule,
    CustomersModule,
    BrandsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'API_KEY', // Nombre con el que se hara referencia
      useValue: API_KEY, // El valor
    },
  ],
})
export class AppModule {}
