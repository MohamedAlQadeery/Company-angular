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
}
