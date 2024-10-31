import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UsersModule } from 'src/users/module/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../strategies/local.strategy';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
