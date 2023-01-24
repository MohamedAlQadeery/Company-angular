import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ICreatePlanRequest,
  IPlanResponse,
  IUpdatePlanRequest,
} from '../shared/interfaces/PlanDtos';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  private baseUrl = environment.baseURL + '/api/Plan';

  constructor(private _http: HttpClient) {}

  public GetAllPlans() {
    return this._http.get<IPlanResponse[]>(this.baseUrl);
  }

  public GetPlanById(id: number) {
    return this._http.get<IPlanResponse>(`${this.baseUrl}/${id}`);
  }

  public CreatePlan(plan: ICreatePlanRequest) {
    return this._http.post<IPlanResponse>(this.baseUrl, plan);
  }

  public UpdatePlan(plan: IUpdatePlanRequest, id: number) {
    return this._http.put<IPlanResponse>(`${this.baseUrl}/${id}`, plan);
  }

  public DeletePlan(id: number) {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}
