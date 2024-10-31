import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/users/service/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    const isMatch = await bcrypt.compare(
      password,
      user.password,
    );

    if (!user && !isMatch) return null;

    return user;
  }
}
