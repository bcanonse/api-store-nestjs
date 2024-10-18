import { ConfigType } from '@nestjs/config';
import config from 'src/config';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'PG',
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
      const dataSource = new DataSource({
        type: 'postgres',
        host,
        port,
        username,
        password,
        database: name,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
