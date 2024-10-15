import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/module/categories.module';
import { ProductsModule } from './products/module/products.module';
import { UsersModule } from './users/module/users.module';
import { OrdersModule } from './orders/module/orders.module';
import { CustomersModule } from './customers/module/customers.module';
import { BrandsModule } from './brands/module/brands.module';
import { HttpModule, HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

const API_KEY = 'KKS404K3Mjsd432';

@Module({
  imports: [
    HttpModule,
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
    {
      provide: 'TASKS',
      useFactory: async (httpService: HttpService) => {
        const tasks = await httpService.axiosRef.get(
          'https://jsonplaceholder.typicode.com/todos',
        );

        /* const tasks = await firstValueFrom(
          httpService.get(
            'https://jsonplaceholder.typicode.com/todos',
          ),
        ); */

        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
