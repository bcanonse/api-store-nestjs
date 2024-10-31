import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const AUTH_GUARD_LOCAL = 'local';

@Injectable()
export class LocalAuthGuard extends AuthGuard(
  AUTH_GUARD_LOCAL,
) {}
