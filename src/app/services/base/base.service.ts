import { HttpClient } from '@angular/common/http';
import { BaseModel } from 'src/app/shared/interfaces/base/base';
import { environment } from 'src/environments/environment';

export class BaseService<T extends BaseModel> {
  entities: T[];
  constructor(protected _http: HttpClient, protected _endPoint: string) {}
  protected baseUrl = environment.baseURL + this._endPoint;

  public GetAll() {
    return this._http.get<T[]>(this.baseUrl);
  }

  public GetById(id: number) {
    return this._http.get<T>(`${this.baseUrl}/${id}`);
  }

  public Create(model: T) {
    return this._http.post<T>(this.baseUrl, model);
  }

  public Update(model: T, id: number) {
    return this._http.put<T>(`${this.baseUrl}/${id}`, model);
  }

  public Delete(id: number) {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}
