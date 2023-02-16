export interface IPlanResponse {
  id: number;
  name: string;
  nameAR: string;
  nameTR: string;
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
  nameAR: string;
  nameTR: string;
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
  nameAR: string;
  nameTR: string;
  description: string;
  duration: number;
  price: number;
}
