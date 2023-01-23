export interface IPlanResponse {
  id: number;
  name: string;
  description: string | null;
  duration: number;
  price: number;
  createdAt: Date;
  updatedAt: Date | null;
  postsPerMonth: number;
}

export interface ICreatePlanRequest {
  name: string;
  description: string;
  duration: number;
  price: number;
}
export interface IUpdatePlanRequest {
  id: number;
  name: string;
  description: string;
  duration: number;
  price: number;
}
