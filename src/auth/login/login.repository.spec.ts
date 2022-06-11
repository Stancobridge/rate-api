import { Test, TestingModule } from '@nestjs/testing';
import { LoginRepository } from './login.repository';

describe('LoginRepository', () => {
  let provider: LoginRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginRepository],
    }).compile();

    provider = module.get<LoginRepository>(LoginRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
