import { BaseModel } from "./base/base";

export interface WebSiteInfo extends BaseModel {
  name: string;
  nameAR: string;
  nameTR: string;
  email: string;
  phoneNumber: string;
  workingTimeStart: Date;
  workingTimeEnd: Date;
  aboutUs: string;
  aboutUsAR: string;
  aboutUsTR: string;
  expYears: number;
}
