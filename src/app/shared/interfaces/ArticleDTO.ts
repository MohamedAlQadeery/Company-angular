import { BaseModel } from './base/base';
import { Blog } from './BlogDTO';

export interface Article extends BaseModel {
  title: string;
  titleAR: string;
  titleTR: string;
  content: string;
  contentAR: string;
  contentTR: string;
  blogId: number | null;
  blog: Blog;
}
