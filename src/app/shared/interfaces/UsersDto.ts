import { IAttachmentResponse } from './AttachmentDtos';

export interface ICreateProviderRequest {
  description: string;
  googleLocation: string;
  website: string;
  discount: number;
  companyName: string;
  nationality: string;
  country: string;
  city: string;
  addressOne: string;
  categoryId: number;
  photoFile: File;
  logoFile: File;
  email: string;
  password: string;
  phoneNumber: string;
  planId: number;
}
export interface IProviderResponse {
  description: string;
  googleLocation: string;
  website: string;
  discount: number;
  companyName: string;
  nationality: string;
  country: string;
  city: string;
  addressOne: string;
  categoryId: number;
  email: string;
  userName: string;
  attachments: IAttachmentResponse[];
  phoneNumber: string;
  id: number;
  isActive: boolean;
}

export interface ICreateSubscriberRequest {
  country: string;
  city: string;
  addressOne: string;
  email: string;
  password: string;
  firstName: string;
  middleName: string;
  lastName: string;
  genderId: number;
  birthDate: Date;
  InformationFile: File;
  phoneNumber: string;
  planId: number;
}
export interface ISubscriberResponse {
  id: number;
  country: string;
  city: string;
  addressOne: string;
  email: string;
  password: string;
  firstName: string;
  middleName: string;
  lastName: string;
  genderId: number;
  birthDate: Date;
  isActive: boolean;
  phoneNumber: string;
}

export interface IUserRespose {
  description: string | null;
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  companyName: string | null;
  googleLocation: string | null;
  website: string | null;
  birthDate: string | null;
  nationality: string | null;
  country: string;
  city: string;
  addressOne: string;
  genderId: number | null;
  isActive: boolean | null;
  categoryId: number | null;
  discount: number | null;
  category: string | null;
  attachments: IAttachmentResponse[];
  id: string;
  userName: string | null;
  email: string | null;
  phoneNumber: string | null;
}

export interface IUpdateProviderInfo {
  description: string;
  googleLocation: string;
  website: string;
  companyName: string;
  country: string;
  city: string;
  addressOne: string;
  categoryId: number;
  photoFile: File | null;
  logoFile: File | null;
  phoneNumber: string;
}

export interface IUpdateSubscriberInfo {
  firstName: string;
  middleName: string;
  lastName: string;
  genderId: number;
  birthDate: Date;
  country: string;
  city: string;
  addressOne: string;
  phoneNumber: string;
}

export interface ICreateNormalUserRequest {
  country: string;
  city: string;
  addressOne: string;
  email: string;
  password: string;
  firstName: string;
  middleName: string;
  lastName: string;
  genderId: number;
  birthDate: Date;
  InformationFile: File;
  phoneNumber: string;
  planId: number;
}
