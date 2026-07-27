import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Experience } from './experiences.entity';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperiencesService {
  constructor(
    @InjectRepository(Experience)
    private readonly experiencesRepository: Repository<Experience>,
  ) {}

  create(createExperienceDto: CreateExperienceDto): Promise<Experience> {
    const experience = this.experiencesRepository.create(createExperienceDto);
    return this.experiencesRepository.save(experience);
  }

  findAll(): Promise<Experience[]> {
    return this.experiencesRepository.find();
  }

  async findOne(id: string): Promise<Experience> {
    const experience = await this.experiencesRepository.findOne({ where: { id } });
    if (!experience) throw new NotFoundException(`Experience #${id} not found`);
    return experience;
  }

  async update(id: string, updateExperienceDto: UpdateExperienceDto): Promise<Experience> {
    await this.experiencesRepository.update(id, updateExperienceDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.experiencesRepository.delete(id);
  }
}
