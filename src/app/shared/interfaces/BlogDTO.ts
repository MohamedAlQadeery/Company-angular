import { BaseModel } from './base/base';

export interface Blog extends BaseModel {
  title: string;
  titleAR: string;
  titleTR: string;
  content: string;
  contentAR: string;
  contentTR: string;
}
