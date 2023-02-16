import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ICreateNormalUserRequest,
  IUpdateProviderInfo,
  IUpdateSubscriberInfo,
  IUserRespose,
} from '../shared/interfaces/UsersDto';
import { AuthService } from './auth.service';
import { ICardResponse } from '../shared/interfaces/CardDtos';
import { map } from 'rxjs';

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
    data.append('descriptionAr', updateProviderRequest.descriptionAr);
    data.append('descriptionTr', updateProviderRequest.descriptionTr);
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
    return this._http.get<ICardResponse>(`${this.baseUrl}/card`).pipe(
      map((res) => {
        const formatCardNumber = res.cardNumber.match(/.{1,4}/g)?.join('-');

        const expirationDate = new Date(res.expirationDate);

        const formatedDate = expirationDate.toLocaleDateString('en-US', {
          month: '2-digit',
          year: '2-digit',
        });

        return {
          ...res,
          cardNumber: formatCardNumber,
          expirationDate: formatedDate,
        };
      })
    );
  }

  GetUserData(email: string) {
    // userEmail
    let params = new HttpParams();
    params = params.append('userEmail', email);

    return this._http.get<IUserRespose>(`${this.baseUrl}/GetUserData`, {
      params,
    });
  }

  RegisterNormalUser(registerNormalUserRequest: ICreateNormalUserRequest) {
    const data = new FormData();
    data.append('country', registerNormalUserRequest.country);
    data.append('city', registerNormalUserRequest.city);
    data.append('addressOne', registerNormalUserRequest.addressOne);
    data.append('email', registerNormalUserRequest.email);
    data.append('password', registerNormalUserRequest.password);
    data.append('InformationFile', registerNormalUserRequest.InformationFile);
    data.append('birthDate', registerNormalUserRequest.birthDate.toString());
    data.append('genderId', registerNormalUserRequest.genderId.toString());
    data.append('firstName', registerNormalUserRequest.firstName);
    data.append('middleName', registerNormalUserRequest.middleName);
    data.append('lastName', registerNormalUserRequest.lastName);
    data.append('planId', registerNormalUserRequest.planId.toString());
    data.append('phoneNumber', registerNormalUserRequest.phoneNumber);
    return this._http.post<IUserRespose>(
      `${this.baseUrl}/normalUser/register`,
      data
    );
  }

  GetAllDisabledNormalUsers() {
    return this._http.get<IUserRespose[]>(
      `${this.baseUrl}?RoleName=user&&isactive=false`
    );
  }
}
