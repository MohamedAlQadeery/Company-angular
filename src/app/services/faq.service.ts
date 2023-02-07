import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';
import { environment } from 'src/environments/environment';
import { Faq } from '../shared/interfaces/FaqDTO';

@Injectable({
  providedIn: 'root',
})
export class FaqService extends BaseService<Faq> {
  constructor(_http: HttpClient) {
    super(_http, environment.endPoints.faq);
  }
}
