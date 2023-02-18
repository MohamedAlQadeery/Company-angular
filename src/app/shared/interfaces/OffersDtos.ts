import { IAttachmentResponse } from './AttachmentDtos';
import { IProviderResponse } from './UsersDto';

export interface ICreateOfferRequest {
  description: string;
  photo: File;
  photoAr: File;
  photoTr: File;
  url: string | null;
}

export interface ICreateOfferResponse {
  description: string;
  photo: File;
  photoAr: File;
  photoTr: File;
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
  stringPhoto: string;
  stringPhotoAR: string;
  stringPhotoTR: string;
}
