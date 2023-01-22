import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ICategoryResponse,
  ICreateCategoryRequest,
  IUpdateCategoryRequest,
} from '../shared/interfaces/CategoryDtos';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = environment.baseURL + '/api/category';

  constructor(private _http: HttpClient) {}

  public GetAllCategories() {
    return this._http.get<ICategoryResponse[]>(this.baseUrl);
  }

  public GetCategoryById(id: number) {
    return this._http.get<ICategoryResponse>(`${this.baseUrl}/${id}`);
  }

  public CreateCategory(category: ICreateCategoryRequest) {
    return this._http.post<ICategoryResponse>(this.baseUrl, category);
  }

  public UpdateCategory(category: IUpdateCategoryRequest, id: number) {
    return this._http.put<ICategoryResponse>(`${this.baseUrl}/${id}`, category);
  }

  public DeleteCategory(id: number) {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}
