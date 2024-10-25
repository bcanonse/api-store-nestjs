import { In, Repository } from 'typeorm';

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

  private getOptionsQuery(withRelations: boolean) {
    return withRelations
      ? {
          relations: ['products'],
        }
      : undefined;
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const newBrand = this.categoriesRepository.create(
      createCategoryDto,
    );

    return await this.categoriesRepository.save(newBrand);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoriesRepository.find();
  }

  async findOne(id: number, withRelations = true) {
    const options = this.getOptionsQuery(withRelations);
    const brand = await this.categoriesRepository.findOne({
      where: { id },
      ...options,
    });

    if (!brand) this.throwNotFoundCategoryExcepcetion(id);

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

  async findByIds(categoriesId: number[]) {
    const categories =
      await this.categoriesRepository.findBy({
        id: In(categoriesId),
      });

    if (!categories && categories?.length === 0) {
      this.throwNotFoundCategoryExcepcetion(
        categoriesId,
        false,
      );
    }

    if (categories.length === 0) {
      this.throwNotFoundCategoryExcepcetion(
        categoriesId,
        false,
      );
    }

    return categories;
  }

  private throwNotFoundCategoryExcepcetion(
    data: any,
    isSingular = true,
  ) {
    const singularMessage = isSingular
      ? 'category'
      : 'categories';
    throw new NotFoundException(
      `The ${singularMessage} ${data} not found`,
    );
  }
}
