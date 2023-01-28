import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUserRespose } from '../shared/interfaces/UsersDto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}
  private baseUrl = environment.baseURL + '/api/user';

  GetCurrentUserData() {
    return this._http.get<IUserRespose>(`${this.baseUrl}/GetCurrentUserData`);
  }
}
