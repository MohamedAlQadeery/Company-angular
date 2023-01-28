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
