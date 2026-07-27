import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Education } from './education.entity';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,
  ) {}

  create(createEducationDto: CreateEducationDto): Promise<Education> {
    const education = this.educationRepository.create(createEducationDto);
    return this.educationRepository.save(education);
  }

  findAll(): Promise<Education[]> {
    return this.educationRepository.find();
  }

  async findOne(id: string): Promise<Education> {
    const education = await this.educationRepository.findOne({ where: { id } });
    if (!education) throw new NotFoundException(`Education #${id} not found`);
    return education;
  }

  async update(id: string, updateEducationDto: UpdateEducationDto): Promise<Education> {
    await this.educationRepository.update(id, updateEducationDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.educationRepository.delete(id);
  }
}
