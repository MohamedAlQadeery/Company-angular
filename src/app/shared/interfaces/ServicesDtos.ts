import { IAttachmentResponse } from './AttachmentDtos';
import { IProviderResponse } from './UsersDto';

export interface ICreateServiceRequest {
  title: string;
  description: string;
}

export interface ICreateServiceResponse {
  title: string;
  description: string;
  isActive: boolean;
  applicationUserId: string;
  id: number;
}

export interface IServiceResponse {
  title: string;
  description: string;
  applicationUser: IProviderResponse;
  isActive: boolean;
}
