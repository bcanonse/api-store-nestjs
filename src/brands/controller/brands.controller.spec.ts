import { Test, TestingModule } from '@nestjs/testing';
import { BrandsController } from '../controller/brands.controller';
import { BrandsService } from '../service/brands.service';

describe('BrandsController', () => {
  let controller: BrandsController;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        controllers: [BrandsController],
        providers: [BrandsService],
      }).compile();

    controller = module.get<BrandsController>(
      BrandsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
