import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  IUpdateProviderInfo,
  IUpdateSubscriberInfo,
  IUserRespose,
} from '../shared/interfaces/UsersDto';
import { AuthService } from './auth.service';
import { ICardResponse } from '../shared/interfaces/CardDtos';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}
  private baseUrl = environment.baseURL + '/api/user';

  GetCurrentUserData() {
    return this._http.get<IUserRespose>(`${this.baseUrl}/GetCurrentUserData`);
  }

  UpdateProviderInfo(updateProviderRequest: IUpdateProviderInfo) {
    const data = new FormData();
    data.append('description', updateProviderRequest.description);
    data.append('companyName', updateProviderRequest.companyName);
    data.append('googleLocation', updateProviderRequest.googleLocation);
    data.append('website', updateProviderRequest.website);
    data.append('country', updateProviderRequest.country);
    data.append('city', updateProviderRequest.city);
    data.append('addressOne', updateProviderRequest.addressOne);
    data.append('categoryId', updateProviderRequest.categoryId.toString());

    if (updateProviderRequest.photoFile) {
      data.append('photoFile', updateProviderRequest.photoFile);
    }

    if (updateProviderRequest.logoFile) {
      data.append('logoFile', updateProviderRequest.logoFile);
    }
    data.append('phoneNumber', updateProviderRequest.phoneNumber);
    return this._http.put<IUserRespose>(`${this.baseUrl}/provider`, data);
  }

  UpdateSubscriberInfo(updateSubscriberRequest: IUpdateSubscriberInfo) {
    return this._http.put<IUserRespose>(
      `${this.baseUrl}/subscriber`,
      updateSubscriberRequest
    );
  }

  GetCurrentUserCard() {
    return this._http.get<ICardResponse>(`${this.baseUrl}/card`);
  }

  GetUserData(email: string) {
    return this._http.get<IUserRespose>(`${this.baseUrl}/${email}`);
  }
}
