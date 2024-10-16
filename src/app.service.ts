import { Inject, Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject('TASKS') private readonly tasks: any[],
    // private readonly config: ConfigService,
    @Inject(config.KEY)
    private readonly configService: ConfigType<
      typeof config
    >,
  ) {}

  getHello(): string {
    /* const apiKey = this.config.get<string>('API_KEY');
    const db = this.config.get<string>('DATABASE_NAME'); */
    const apiKey = this.configService.apiKey;
    const db = this.configService.database.name;
    const port = this.configService.database.port;
    return `Hello World! ${apiKey} with db: ${db} running in port ${port}`;
  }
}
