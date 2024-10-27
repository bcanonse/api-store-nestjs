import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/module/categories.module';
import { ProductsModule } from './products/module/products.module';
import { UsersModule } from './users/module/users.module';
import { OrdersModule } from './orders/module/orders.module';
import { OrderProductsModule } from './order-products/module/order-products.module';
import { CustomersModule } from './customers/module/customers.module';
import { BrandsModule } from './brands/module/brands.module';
import { DatabaseModule } from './database/database.module';
import { environments } from './environments';
import config from './config';
import { validate } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        environments[process.env.NODE_ENV] || '.env',
      load: [config],
      validate,
      isGlobal: true,
      //Usando joi para validar el esquema.
      // validationSchema: Joi.object({
      //   API_KEY: Joi.string().required(),
      //   DATABASE_NAME: Joi.string().required(),
      //   DB_PORT: Joi.number()
      //     .port()
      //     .required()
      //     .default(5432),
      // }),
    }),
    HttpModule,
    CategoriesModule,
    ProductsModule,
    UsersModule,
    OrdersModule,
    CustomersModule,
    BrandsModule,
    DatabaseModule,
    OrderProductsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
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
