export class CreateEducationDto {
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate?: Date;
  endDate?: Date;
  description?: string;
}
