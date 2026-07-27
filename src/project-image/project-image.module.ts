import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectImageController } from './project-image.controller';
import { ProjectImageService } from './project-image.service';
import { ProjectImage } from './project-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectImage])],
  controllers: [ProjectImageController],
  providers: [ProjectImageService],
  exports: [ProjectImageService],
})
export class ProjectImageModule {}
