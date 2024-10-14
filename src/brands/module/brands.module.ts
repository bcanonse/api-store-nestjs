import { Module } from '@nestjs/common';
import { BrandsService } from '../service/brands.service';
import { BrandsController } from '../controller/brands.controller';

@Module({
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}
