import { Inject, Injectable } from '@nestjs/common';
import { CreateRateDto } from './dto/create-rate.dto';
import { UpdateRateDto } from './dto/update-rate.dto';
import { RateRepository } from './rate-repository';

@Injectable()
export class RateService {
  @Inject(RateRepository)
  private readonly rateRepository: RateRepository;

  async create(createRateDto: CreateRateDto) {
    const rate = await this.rateRepository.create(createRateDto);
    return { rate };
  }

  async findAll() {
    const date = new Date().toLocaleDateString();
    const rates = await this.rateRepository.findMany({ date });
    return { rates };
  }

  async findOne(id: string) {
    const rate = await this.rateRepository.findOne({ id });
    return { rate };
  }

  async update(id: string, updateRateDto: UpdateRateDto) {
    const rate = await this.rateRepository.update(id, updateRateDto);
    return { rate };
  }

  async remove(id: string) {
    const rate = await this.rateRepository.delete(id);
    return { rate };
  }
}
