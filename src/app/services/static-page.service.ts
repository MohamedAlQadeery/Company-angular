import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';
import { StaticPage, StaticPageToFormData } from '../shared/interfaces/StaticPage';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StaticPageService extends BaseService<StaticPage> {
  constructor(_http: HttpClient) {
    super(_http, environment.endPoints.staticPage);
  }

  GetPageByName(pageName: string) {
    return this._http.get<StaticPage>(`${this.baseUrl}/search/${pageName}`);
  }

  public override Update(model: StaticPage, id: number): Observable<any> {
    return this._http.put(`${this.baseUrl}/${id}`, StaticPageToFormData(model));
  }

  public override Create(model: StaticPage): Observable<any> {
    return this._http.post(`${this.baseUrl}`, StaticPageToFormData(model));
  }
}

