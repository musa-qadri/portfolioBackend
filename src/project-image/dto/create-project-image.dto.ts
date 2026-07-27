export class CreateProjectImageDto {
  projectId: string;
  imageUrl: string;
  altText?: string;
  isThumbnail?: boolean;
  sortOrder?: number;
}
