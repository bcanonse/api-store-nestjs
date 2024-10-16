import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('tasks')
  async getTasks(): Promise<any | null> {
    return await this.appService.getTasks();
  }

  //Todas las rutas estaticas deben de ir primero y luego colocar las rutas dinamicas para evitar colisiones con las rutas.
}
