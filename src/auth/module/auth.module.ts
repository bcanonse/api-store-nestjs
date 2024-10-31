import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigType } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { UsersModule } from 'src/users/module/users.module';

import { AuthService } from '../services/auth.service';

import { LocalStrategy } from '../strategies/local.strategy';

import config from 'src/config';

import { AuthController } from '../controllers/auth.controller';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { JwtAuthGuard } from '../guards/jwt-auth/jwt-auth.guard';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      // inyectamos la configuracion
      inject: [config.KEY],
      // inyectamos el tipo de config en el use factory
      useFactory: (
        configService: ConfigType<typeof config>,
      ) => {
        return {
          // le debemos enviar un secreto que será una variable de ambiente
          secret: configService.jwt.secret,
          signOptions: {
            expiresIn: configService.jwt.expires,
          },
        };
      },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
