import { BaseModel } from './base/base';

export interface Faq extends BaseModel {
  questionEnglish: string;
  answerEnglish: string;
  questionArabic: string;
  answerArabic: string;
  questionTurkish: string;
  answerTurkish: string;
}
