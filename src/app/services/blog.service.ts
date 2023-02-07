import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';
import { environment } from 'src/environments/environment';
import { Blog } from '../shared/interfaces/BlogDTO';

@Injectable({
  providedIn: 'root',
})
export class BlogService extends BaseService<Blog> {
  constructor(_http: HttpClient) {
    super(_http, environment.endPoints.blog);
  }
}
