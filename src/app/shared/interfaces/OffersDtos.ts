import { IAttachmentResponse } from './AttachmentDtos';
import { IProviderResponse } from './UsersDto';

export interface ICreateOfferRequest {
  description: string;
  photo: File;
  url: string | null;
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
  createdAt: Date;
  updatedAt: string;
  url: string | null;
  applicationUser: IProviderResponse;
  attachments: IAttachmentResponse; // we take photo from it
}
