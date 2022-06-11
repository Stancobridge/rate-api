import { Test, TestingModule } from '@nestjs/testing';
import { DeviceModule } from '../../device/device.module';
import { LocationModule } from '../../location/location.module';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginService],
      imports: [DeviceModule, LocationModule],
    }).compile();

    service = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
