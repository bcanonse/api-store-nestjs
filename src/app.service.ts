import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private readonly apiKey: string,
  ) {}

  getHello(): string {
    return `Hello World! ${this.apiKey}`;
  }
}
