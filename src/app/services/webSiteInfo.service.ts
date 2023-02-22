import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';
import { WebSiteInfo } from '../shared/interfaces/WebSiteInfo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebSiteInfoService extends BaseService<WebSiteInfo> {
  constructor(_http: HttpClient) {
    super(_http, environment.endPoints.webSiteInfo);
  }
}
