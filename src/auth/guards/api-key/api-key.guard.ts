import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
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
