import { BaseModel } from './base/base';

export interface Blog extends BaseModel {
  title: string;
  content: string;
}
