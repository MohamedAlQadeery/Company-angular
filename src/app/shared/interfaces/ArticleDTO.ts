import { BaseModel } from './base/base';
import { Blog } from './BlogDTO';

export interface Article extends BaseModel {
  title: string;
  content: string;
  blogId: number | null;
  blog: Blog;
  createdAt: Date;
}
