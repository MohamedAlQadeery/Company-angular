import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ICreateServiceRequest,
  ICreateServiceResponse,
} from '../shared/interfaces/ServicesDtos';

@Injectable({
  providedIn: 'root',
})
export class ProviderServiceService {
  private baseUrl = environment.baseURL + '/api/service';

  constructor(private _http: HttpClient) {}

  public CreateService(createServiceRequest: ICreateServiceRequest) {
    return this._http.post<ICreateServiceResponse>(
      `${this.baseUrl}`,
      createServiceRequest
    );
  }
}
