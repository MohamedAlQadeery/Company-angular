export interface IPlanResponse {
  id: number;
  name: string;
  servicePerMonth: number;
  offerPerMonth: number;
  planType: number;
  duration: number;
  price: number;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface ICreatePlanRequest {
  name: string;
  description: string;
  duration: number;
  price: number;
  planType: number;
  servicePerMonth: number;
  offerPerMonth: number;
}
export interface IUpdatePlanRequest {
  id: number;
  name: string;
  description: string;
  duration: number;
  price: number;
}
