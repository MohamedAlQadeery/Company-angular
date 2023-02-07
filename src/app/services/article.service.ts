import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';
import { environment } from 'src/environments/environment';
import { Article } from '../shared/interfaces/ArticleDTO';

@Injectable({
  providedIn: 'root',
})
export class ArticleService extends BaseService<Article> {
  constructor(_http: HttpClient) {
    super(_http, environment.endPoints.article);
  }
}
