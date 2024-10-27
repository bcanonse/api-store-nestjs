import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
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
