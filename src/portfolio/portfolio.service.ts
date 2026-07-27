import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Portfolio } from './portfolio.entity';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private readonly portfolioRepository: Repository<Portfolio>,
  ) {}

  create(data: Partial<Portfolio>): Promise<Portfolio> {
    const portfolio = this.portfolioRepository.create(data);
    return this.portfolioRepository.save(portfolio);
  }

  findAll(): Promise<Portfolio[]> {
    return this.portfolioRepository.find();
  }

  async findOne(id: string): Promise<Portfolio> {
    const item = await this.portfolioRepository.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Portfolio #${id} not found`);
    return item;
  }

  async update(id: string, data: Partial<Portfolio>): Promise<Portfolio> {
    await this.portfolioRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.portfolioRepository.delete(id);
  }
}
