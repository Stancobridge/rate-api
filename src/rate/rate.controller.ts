import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth';
import { BaseService } from '../base';
import { CreateRateDto } from './dto/create-rate.dto';
import { UpdateRateDto } from './dto/update-rate.dto';
import { RateService } from './rate.service';

@Controller('rates')
@ApiTags('rates')
@UseGuards(JwtAuthGuard)
export class RateController {
  @Inject(RateService)
  private readonly rateService: RateService;
  @Inject(BaseService)
  private readonly baseService: BaseService;

  @Post()
  async create(@Body() createRateDto: CreateRateDto) {
    const rate = await this.rateService.create(createRateDto);
    return this.baseService.transformResponse(
      'Rate Created successuffly',
      rate,
      HttpStatus.CREATED,
    );
  }

  @Get('')
  async findAll() {
    const rates = await this.rateService.findAll();
    return this.baseService.transformResponse(
      'Rates fetched successuffuly',
      rates,
      HttpStatus.OK,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const rates = await this.rateService.findOne(id);
    return this.baseService.transformResponse(
      'Rate fetched successufuly',
      rates,
      HttpStatus.OK,
    );
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRateDto: UpdateRateDto) {
    const rates = await this.rateService.update(id, updateRateDto);
    return this.baseService.transformResponse(
      'Rate Update successufuly',
      rates,
      HttpStatus.OK,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const rates = await this.rateService.remove(id);
    return this.baseService.transformResponse(
      'Rate deleted successufuly',
      rates,
      HttpStatus.OK,
    );
  }
}
