import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperiencesController } from './experiences.controller';
import { ExperiencesService } from './experiences.service';
import { Experience } from './experiences.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Experience])],
  controllers: [ExperiencesController],
  providers: [ExperiencesService],
  exports: [ExperiencesService],
})
export class ExperiencesModule {}
