import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/auth/decorators/public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
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

    const authHeader = request.header('Auth') ?? '';

    if (!authHeader)
      throw new ForbiddenException(`Not header value`);

    if (authHeader !== 'EWQOIEWR')
      throw new UnauthorizedException(`Not allowed`);

    return true;
  }
}
