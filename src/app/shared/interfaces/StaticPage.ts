import { BaseModel } from './base/base';

export interface StaticPage extends BaseModel {
  pageName: string;
  description: string;
}
