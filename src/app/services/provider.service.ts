import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ICreateProviderRequest,
  IProviderResponse,
} from '../shared/interfaces/UsersDto';
import { Review } from '../shared/interfaces/review';

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  private baseUrl = environment.baseURL + '/api/user/provider';
  private baseUrl2 = environment.baseURL + '/api/user';
  private reviewURL = environment.baseURL + '/api/Review';
  constructor(private _http: HttpClient) {}

  RegisterProvider(registerProviderRequest: ICreateProviderRequest) {
    const data = new FormData();
    data.append('description', registerProviderRequest.description);
    data.append('companyName', registerProviderRequest.companyName);
    data.append('googleLocation', registerProviderRequest.googleLocation);
    data.append('website', registerProviderRequest.website);
    data.append('discount', registerProviderRequest.discount.toString());
    data.append('nationality', registerProviderRequest.nationality);
    data.append('country', registerProviderRequest.country);
    data.append('city', registerProviderRequest.city);
    data.append('addressOne', registerProviderRequest.addressOne);
    data.append('categoryId', registerProviderRequest.categoryId.toString());
    data.append('email', registerProviderRequest.email);
    data.append('password', registerProviderRequest.password);
    data.append('photoFile', registerProviderRequest.photoFile);
    data.append('logoFile', registerProviderRequest.logoFile);
    data.append('planId', registerProviderRequest.planId.toString());
    data.append('phoneNumber', registerProviderRequest.phoneNumber);

    return this._http.post<IProviderResponse>(`${this.baseUrl}/register`, data);
  }

  GetNotActiveProvider() {
    return this._http.get<IProviderResponse[]>(
      `${this.baseUrl2}?RoleName=provider&&isactive=false&&isApproved=false`
    );
  }

  ActiveProvider(userEmail: string) {
    return this._http.get(`${this.baseUrl2}/Approve/Provider/${userEmail}`);
  }

  GetAllProviders() {
    return this._http.get<IProviderResponse[]>(
      `${this.baseUrl2}?RoleName=provider&&isactive=true&&isApproved=true`
    );
  }

  ReviewProvider(review: Review) {
    return this._http.post(`${this.reviewURL}`, review);
  }
  UpdateProvider(review: Review) {
    return this._http.put(`${this.reviewURL}`, review);
  }

  GetAllReviews() {
    return this._http.get<Review[]>(this.reviewURL);
  }
}
