export class CreateExperienceDto {
  company: string;
  position: string;
  location?: string;
  startDate?: Date;
  endDate?: Date;
  isCurrent?: boolean;
  description?: string;
}
