import { BaseModel } from './base/base';

export interface Contact extends BaseModel {
  name: string;
  emailAddres: string;
  phoneNumber: string;
  message: string;
}
