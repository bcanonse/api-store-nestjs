import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    @Inject('TASKS') private readonly tasks: any[],
    private readonly config: ConfigService,
  ) {}

  getHello(): string {
    const apiKey = this.config.get<string>('API_KEY');
    const db = this.config.get<string>('DATABASE_NAME');
    return `Hello World! ${apiKey} with db: ${db}`;
  }
}
