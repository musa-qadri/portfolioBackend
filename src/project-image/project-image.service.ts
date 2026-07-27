import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectImage } from './project-image.entity';
import { CreateProjectImageDto } from './dto/create-project-image.dto';
import { UpdateProjectImageDto } from './dto/update-project-image.dto';

@Injectable()
export class ProjectImageService {
  constructor(
    @InjectRepository(ProjectImage)
    private readonly projectImageRepository: Repository<ProjectImage>,
  ) {}

  create(createProjectImageDto: CreateProjectImageDto): Promise<ProjectImage> {
    const image = this.projectImageRepository.create(createProjectImageDto);
    return this.projectImageRepository.save(image);
  }

  findAll(): Promise<ProjectImage[]> {
    return this.projectImageRepository.find();
  }

  async findOne(id: string): Promise<ProjectImage> {
    const image = await this.projectImageRepository.findOne({ where: { id } });
    if (!image) throw new NotFoundException(`ProjectImage #${id} not found`);
    return image;
  }

  async update(id: string, updateProjectImageDto: UpdateProjectImageDto): Promise<ProjectImage> {
    await this.projectImageRepository.update(id, updateProjectImageDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.projectImageRepository.delete(id);
  }
}
