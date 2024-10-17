// lambda.ts
import { Handler, Context } from 'aws-lambda';
import { Server } from 'http';
import {
  createServer,
  proxy,
} from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import express from 'express';
import {
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes below
const binaryMimeTypes: string[] = [];

let cachedServer: Server;

async function bootstrapServer(): Promise<Server> {
  if (!cachedServer) {
    const expressApp = express();
    const nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );

    nestApp.useGlobalPipes(
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
      }),
    );

    const config = new DocumentBuilder()
      .setTitle('API Store')
      .setDescription('Api store with NestJS')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(
      nestApp,
      config,
    );
    SwaggerModule.setup('docs', nestApp, document);

    nestApp.enableCors();

    nestApp.use(eventContext());
    nestApp.setGlobalPrefix('api');
    await nestApp.init();

    cachedServer = createServer(
      expressApp,
      undefined,
      binaryMimeTypes,
    );
  }
  return cachedServer;
}

export const handler: Handler = async (
  event: any,
  context: Context,
) => {
  cachedServer = await bootstrapServer();
  return proxy(cachedServer, event, context, 'PROMISE')
    .promise;
};
