import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiKeyGuard } from './auth/guards/api-key/api-key.guard';
import { Public } from './auth/decorators/public.decorator';

/* para que todos los enpoints de el controlador esten protegidos colocamos el
decodador arriba del controlador */
// todos los endpoints estarán protegidos
@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // SetMetadata nos permite enviar metadatos que podemos recibir en el contexto del guardian
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('tasks')
  async getTasks(): Promise<any | null> {
    return await this.appService.getTasks();
  }

  //Todas las rutas estaticas deben de ir primero y luego colocar las rutas dinamicas para evitar colisiones con las rutas.
}
