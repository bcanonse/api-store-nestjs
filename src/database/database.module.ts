import { Global, Module } from '@nestjs/common';

const API_KEY = 'KKS404K3Mjsd432';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY', // Nombre con el que se hara referencia
      useValue: API_KEY, // El valor
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
