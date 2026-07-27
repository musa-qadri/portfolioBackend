import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blogs.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogsRepository: Repository<Blog>,
  ) {}

  create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const blog = this.blogsRepository.create(createBlogDto);
    return this.blogsRepository.save(blog);
  }

  findAll(): Promise<Blog[]> {
    return this.blogsRepository.find();
  }

  async findOne(id: string): Promise<Blog> {
    const blog = await this.blogsRepository.findOne({ where: { id } });
    if (!blog) throw new NotFoundException(`Blog #${id} not found`);
    return blog;
  }

  async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    await this.blogsRepository.update(id, updateBlogDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.blogsRepository.delete(id);
  }
}
