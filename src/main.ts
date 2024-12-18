import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  ClassSerializerInterceptor,
  ValidationPipe,
} from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message:
            error.constraints[
              Object.keys(error.constraints)[0]
            ],
        }));
        return new BadRequestException(result);
      },
      stopAtFirstError: true,
      whitelist: true, // Ignorar datos que no esten en los DTO,
      forbidNonWhitelisted: true, // Lanzar error si existen datos prohibidos
      disableErrorMessages:
        process.env.ENVIRONMENT === 'production',
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // usamos el interceptor en la configuración global
  // añadimos una nueva instancia de la clase "ClassSerializerInterceptor" a la configuración global
  // al crear la clase, le debemos mandar el reflector, para esto lo obtenemos y lo enviamos
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
  );

  const config = new DocumentBuilder()
    .setTitle('API Store')
    .setDescription('Api store with NestJS')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(
    app,
    config,
  );
  SwaggerModule.setup('docs', app, document);

  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
