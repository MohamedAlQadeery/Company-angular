import { IAttachmentResponse } from './AttachmentDtos';
import { IProviderResponse } from './UsersDto';

export interface ICreateOfferRequest {
  description: string;
  photo: File;
}

export interface ICreateOfferResponse {
  description: string;
  photo: File;
  isActive: boolean;
}

export interface IOfferResponse {
  id: number;
  description: string;
  isActive: boolean;
  createdAt:string;
  updatedAt:string;
  applicationUser: IProviderResponse;
  attachments: IAttachmentResponse; // we take photo from it
}
