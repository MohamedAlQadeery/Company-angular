import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';
import { StaticPage } from '../shared/interfaces/StaticPage';
import { environment } from 'src/environments/environment';

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
}
