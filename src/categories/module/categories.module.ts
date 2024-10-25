import { Module } from '@nestjs/common';
import { CategoriesService } from '../service/categories.service';
import { CategoriesController } from '../controller/categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
