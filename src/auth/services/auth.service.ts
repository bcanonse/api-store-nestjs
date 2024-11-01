import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/service/users.service';
import { User } from 'src/users/entities/user.entity';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    const isMatch = await bcrypt.compare(
      password,
      user.password,
    );

    if (!user || !isMatch) return null;

    return user;
  }

  async login(user: User) {
    const payload: PayloadToken = {
      role: user.role,
      sub: user.id,
    };

    return {
      access_token:
        await this.jwtService.signAsync(payload),
      user,
    };
  }
}
