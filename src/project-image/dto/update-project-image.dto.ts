import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectImageDto } from './create-project-image.dto';

export class UpdateProjectImageDto extends PartialType(CreateProjectImageDto) {}
