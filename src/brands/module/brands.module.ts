import { Module } from '@nestjs/common';
import { BrandsService } from '../service/brands.service';
import { BrandsController } from '../controller/brands.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from '../entities/brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Brand])],
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}
