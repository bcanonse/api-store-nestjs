import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from '../entities/brand.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandsRepository: Repository<Brand>,
  ) {}

  async create(createBrandDto: CreateBrandDto) {
    const newBrand =
      this.brandsRepository.create(createBrandDto);

    return await this.brandsRepository.save(newBrand);
  }

  async findAll(): Promise<Brand[]> {
    return await this.brandsRepository.find();
  }

  async findOne(id: number) {
    const brand = await this.brandsRepository.findOne({
      where: { id },
    });

    if (!brand)
      throw new NotFoundException(
        `The brand ${id} not found`,
      );

    return brand;
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    const brand = await this.findOne(id);

    this.brandsRepository.merge(brand, updateBrandDto);

    return await this.brandsRepository.save(brand);
  }

  async remove(id: number) {
    await this.findOne(id);

    return await this.brandsRepository.delete(id);
  }
}
