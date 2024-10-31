import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/auth/decorators/roles.decorator';
import { PayloadToken } from 'src/auth/models/token.model';
import { UserRole } from 'src/users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride<
      UserRole[]
    >(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) return true;

    const request: Request = context
      .switchToHttp()
      .getRequest();
    const user = request.user as PayloadToken;

    const isAuth = roles.some((role) =>
      user.role?.includes(role),
    );

    if (!isAuth)
      throw new ForbiddenException(
        `Your role is not authorized`,
      );

    return isAuth;
  }
}
