import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ICreateSubscriberRequest,
  ISubscriberResponse,
} from '../shared/interfaces/UsersDto';

@Injectable({
  providedIn: 'root',
})
export class SubscriberService {
  private baseUrl = environment.baseURL + '/api/user/subscriber';

  constructor(private _http: HttpClient) {}

  RegisterSubscriber(registerSubscriberRequest: ICreateSubscriberRequest) {
    const data = new FormData();
    data.append('country', registerSubscriberRequest.country);
    data.append('city', registerSubscriberRequest.city);
    data.append('addressOne', registerSubscriberRequest.addressOne);
    data.append('email', registerSubscriberRequest.email);
    data.append('password', registerSubscriberRequest.password);
    data.append('InformationFile', registerSubscriberRequest.InformationFile);
    data.append('birthDate', registerSubscriberRequest.birthDate.toString());
    data.append('genderId', registerSubscriberRequest.genderId.toString());
    data.append('firstName', registerSubscriberRequest.firstName);
    data.append('middleName', registerSubscriberRequest.middleName);
    data.append('lastName', registerSubscriberRequest.lastName);
    data.append('planId', registerSubscriberRequest.planId.toString());
    return this._http.post<ISubscriberResponse>(
      `${this.baseUrl}/register`,
      data
    );
  }
}
