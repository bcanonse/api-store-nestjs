import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import config from 'src/config';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
) {
  constructor(
    @Inject(config.KEY)
    private readonly configService: ConfigType<
      typeof config
    >,
  ) {
    super({
      // desde donde va a capturar el token
      // lo capturará desde el header
      // con el formato de "bearer token"
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      // no queremos ignorar la expiración del token
      ignoreExpiration: false,
      // el enviamos cual es el secreto para que pueda desencriptar el token
      secretOrKey: configService.jwt.secret,
    });
  }

  validate(payload: PayloadToken) {
    return payload;
  }
}
