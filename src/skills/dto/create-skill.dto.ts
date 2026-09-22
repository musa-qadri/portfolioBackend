import { IsString, IsArray, IsOptional, IsNumber } from 'class-validator';

export class CreateSkillDto {
  @IsString()
  title: string;

  @IsArray()
  @IsString({ each: true })
  skills: string[];

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsNumber()
  proficiency?: number;

  @IsOptional()
  @IsString()
  iconUrl?: string;
}
