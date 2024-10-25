import { Repository } from 'typeorm';

import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const newBrand = this.categoriesRepository.create(
      createCategoryDto,
    );

    return await this.categoriesRepository.save(newBrand);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoriesRepository.find();
  }

  async findOne(id: number) {
    const brand = await this.categoriesRepository.findOne({
      where: { id },
      relations: ['product'],
    });

    if (!brand)
      throw new NotFoundException(
        `The category ${id} not found`,
      );

    return brand;
  }

  async update(
    id: number,
    updateBrandDto: UpdateCategoryDto,
  ) {
    const brand = await this.findOne(id);

    this.categoriesRepository.merge(brand, updateBrandDto);

    return await this.categoriesRepository.save(brand);
  }

  async remove(id: number) {
    await this.findOne(id);

    return await this.categoriesRepository.delete(id);
  }
}
