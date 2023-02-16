export interface ICategoryResponse {
  id: number;
  name: string;
  nameAr: string;
  nameTR: string;
  description: string;
  descriptionAR: string;
  descriptionTR: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface ICreateCategoryRequest {
  name: string;
  nameAr: string;
  nameTR: string;
  description: string;
  descriptionAR: string;
  descriptionTR: string;
}
export interface IUpdateCategoryRequest {
  id: number;
  name: string;
  nameAr: string;
  nameTR: string;
  description: string;
  descriptionAR: string;
  descriptionTR: string;
}
