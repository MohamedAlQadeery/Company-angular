import { BaseModel } from './base/base';

export interface Review extends BaseModel {
  stars: number;
  providerId: string;
}
