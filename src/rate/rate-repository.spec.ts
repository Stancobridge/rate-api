import { Test, TestingModule } from '@nestjs/testing';
import { RateRepository } from './rate-repository';

describe('RateRepository', () => {
  let provider: RateRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RateRepository],
    }).compile();

    provider = module.get<RateRepository>(RateRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
