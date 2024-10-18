import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import config from 'src/config';

const API_KEY = 'KKS404K3Mjsd432';

@Global()
@Module({
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
  exports: ['API_KEY', 'PG'],
})
export class DatabaseModule {}
