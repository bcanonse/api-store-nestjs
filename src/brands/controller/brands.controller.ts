import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { BrandsService } from '../service/brands.service';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(
    private readonly brandsService: BrandsService,
  ) {}

  @Post()
  async create(@Body() createBrandDto: CreateBrandDto) {
    return await this.brandsService.create(createBrandDto);
  }

  @Get()
  async findAll() {
    return await this.brandsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.brandsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return await this.brandsService.update(
      id,
      updateBrandDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.brandsService.remove(id);
  }
}
