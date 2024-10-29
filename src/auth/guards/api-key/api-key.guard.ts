import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/auth/decorators/public.decorator';
import config from 'src/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(config.KEY)
    private readonly configService: ConfigType<
      typeof config
    >,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) return true;

    const request = context
      .switchToHttp()
      .getRequest<Request>();

    const authHeader = request.header('API_KEY') ?? '';

    if (!authHeader)
      throw new ForbiddenException(`Not header value`);

    if (authHeader !== this.configService.apiKey)
      throw new UnauthorizedException(`Not allowed`);

    return true;
  }
}
