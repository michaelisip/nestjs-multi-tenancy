import { Test, TestingModule } from '@nestjs/testing';
import { SellersResolver } from './sellers.resolver';
import { SellersService } from './sellers.service';

describe('SellersResolver', () => {
  let resolver: SellersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SellersResolver, SellersService],
    }).compile();

    resolver = module.get<SellersResolver>(SellersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
