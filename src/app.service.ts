import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { Client } from 'pg';

@Injectable()
export class AppService {
  constructor(
    @Inject('TASKS') private readonly tasks: any[],
    // private readonly config: ConfigService,
    @Inject(config.KEY)
    private readonly configService: ConfigType<
      typeof config
    >,
    @Inject('PG') private readonly clientDb: Client,
  ) {}

  getHello(): string {
    /* const apiKey = this.config.get<string>('API_KEY');
    const db = this.config.get<string>('DATABASE_NAME'); */
    const apiKey = this.configService.apiKey;
    const db = this.configService.database.name;
    const port = this.configService.database.port;
    return `Hello World! ${apiKey} with db: ${db} running in port ${port}`;
  }

  async getTasks(): Promise<any | null> {
    try {
      const tasks = await this.clientDb.query(
        'SELECT * FROM tasks',
      );
      return tasks.rows;
    } catch (error) {
      throw new HttpException(
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  getTasksPromise(): Promise<any | null> {
    return new Promise((resolve, reject) => {
      this.clientDb.query(
        'SELECT * FROM tasks',
        (error, response) => {
          if (error) reject(error);

          resolve(response.rows);
        },
      );
    });
  }
}
