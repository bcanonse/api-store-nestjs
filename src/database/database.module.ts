import { Global, Module } from '@nestjs/common';
import { Client } from 'pg';

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
      useFactory: async () => {
        const client = new Client({
          user: 'nestdb',
          host: 'localhost',
          port: 5432,
          database: 'nestdb',
          password: 'nestdb',
        });

        await client.connect();
        return client;
      },
    },
  ],
  exports: ['API_KEY', 'PG'],
})
export class DatabaseModule {}
