import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'pg';
import config from 'src/config';

const API_KEY = 'KKS404K3Mjsd432';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: async (
        configService: ConfigType<typeof config>,
      ) => {
        const {
          host,
          name,
          port,
          user: username,
          password,
        } = configService.dbPostgres;

        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database: name,
          entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
          ],
          synchronize: false,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY', // Nombre con el que se hara referencia
      useValue: API_KEY, // El valor
    },
    {
      provide: 'PG',
      useFactory: async (
        configService: ConfigType<typeof config>,
      ) => {
        const { host, name, port, user, password } =
          configService.dbPostgres;

        const client = new Client({
          user,
          host,
          port,
          database: name,
          password,
        });

        await client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG', TypeOrmModule],
})
export class DatabaseModule {}
