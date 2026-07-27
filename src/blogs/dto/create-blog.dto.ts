export class CreateBlogDto {
  title: string;
  slug: string;
  content?: string;
  coverImageUrl?: string;
  excerpt?: string;
  isPublished?: boolean;
  tags?: string[];
}
