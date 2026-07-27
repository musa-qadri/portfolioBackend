import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './skills.entity';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillsRepository: Repository<Skill>,
  ) {}

  create(createSkillDto: CreateSkillDto): Promise<Skill> {
    const skill = this.skillsRepository.create(createSkillDto);
    return this.skillsRepository.save(skill);
  }

  findAll(): Promise<Skill[]> {
    return this.skillsRepository.find();
  }

  async findOne(id: string): Promise<Skill> {
    const skill = await this.skillsRepository.findOne({ where: { id } });
    if (!skill) throw new NotFoundException(`Skill #${id} not found`);
    return skill;
  }

  async update(id: string, updateSkillDto: UpdateSkillDto): Promise<Skill> {
    await this.skillsRepository.update(id, updateSkillDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.skillsRepository.delete(id);
  }
}
