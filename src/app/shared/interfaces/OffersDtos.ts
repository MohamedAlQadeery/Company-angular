export interface ICreateOfferRequest {
  description: string;
  photo: File;
}

export interface ICreateOfferResponse {
  description: string;
  photo: File;
  isActive: boolean;
}
