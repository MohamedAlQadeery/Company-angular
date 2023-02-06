import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';
import { environment } from 'src/environments/environment';
import {
  GeneralService,
  GeneralServiceToFormData,
} from '../shared/interfaces/GeneralServiceDtos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneralServiceService extends BaseService<GeneralService> {
  constructor(_http: HttpClient) {
    super(_http, environment.endPoints.generalService);
  }

  public override Create(model: GeneralService): Observable<any> {
    return this._http.post(`${this.baseUrl}`, GeneralServiceToFormData(model));
  }

  public override Update(model: GeneralService, id: number): Observable<any> {
    return this._http.put(`${this.baseUrl}/${model.id}`, GeneralServiceToFormData(model));
  }

}
