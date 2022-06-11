import { Test, TestingModule } from '@nestjs/testing';
import { ForgotPasswordRepository } from './forgot-password.repository';

describe('ForgotPasswordRepository', () => {
  let provider: ForgotPasswordRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ForgotPasswordRepository],
    }).compile();

    provider = module.get<ForgotPasswordRepository>(ForgotPasswordRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
