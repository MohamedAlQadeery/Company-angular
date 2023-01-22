export interface ICategoryResponse {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date | null;
}

export interface ICreateCategoryRequest {
  name: string;
  description: string;
}
export interface IUpdateCategoryRequest {
  name: string;
  description: string;
}
