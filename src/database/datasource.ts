import {
  ConfigModule,
  ConfigService,
} from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { getSsl } from './get-ssl';
import { environments } from '../environments';

ConfigModule.forRoot({
  envFilePath: environments[process.env.NODE_ENV] || '.env',
});

config();
const configService = new ConfigService();

const ssl = getSsl();

export default new DataSource({
  type: 'postgres',
  url: configService.get('DATABASE_URL'),
  ssl,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
  logging: true,
  // donde leerá las migraciones
  migrations: [__dirname + '/migrations/*.ts'],
  // nombre de la tabla que llevara el historial de cambios de la db
  migrationsTableName: 'migrations',
});
