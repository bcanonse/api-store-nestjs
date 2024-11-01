import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';
import { OrdersService } from '../service/orders.service';
import { Request } from 'express';
import { PayloadToken } from 'src/auth/models/token.model';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';

@UseGuards(RolesGuard)
@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(
    private readonly ordersService: OrdersService,
  ) {}

  @Roles(UserRole.Basic)
  @Get('my-orders')
  async getOrders(@Req() req: Request) {
    const user = req.user as PayloadToken;

    return await this.ordersService.getOrdersByCustomer(
      user.sub,
    );
  }
}
