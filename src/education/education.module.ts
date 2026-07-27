import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';
import { Education } from './education.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Education])],
  controllers: [EducationController],
  providers: [EducationService],
  exports: [EducationService],
})
export class EducationModule {}
