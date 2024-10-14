import { Module } from '@nestjs/common';
import { CategoriesService } from '../service/categories.service';
import { CategoriesController } from '../controller/categories.controller';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
