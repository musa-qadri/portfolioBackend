export class CreateProjectDto {
  title: string;
  description?: string;
  liveUrl?: string;
  repoUrl?: string;
  techStack?: string[];
}
