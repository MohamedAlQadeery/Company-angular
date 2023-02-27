import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ICreateSubscriberRequest,
  ISubscriberResponse,
} from '../shared/interfaces/UsersDto';
import { ICardResponse } from '../shared/interfaces/CardDtos';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscriberService {
  private baseUrl = environment.baseURL + '/api/user/subscriber';
  private baseUrl2 = environment.baseURL + '/api/user';

  private subscriberUrl = environment.baseURL + '/api/Subscriber';

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
    data.append('phoneNumber', registerSubscriberRequest.phoneNumber);
    return this._http.post<ISubscriberResponse>(
      `${this.baseUrl}/register`,
      data
    );
  }

  GetNotActiveSubscriber() {
    return this._http.get<ISubscriberResponse[]>(
      `${this.baseUrl2}?RoleName=subscriber&&isactive=false&&isApproved=false`
    );
  }
  ActiveSubscriber(userEmail: string) {
    return this._http.get(`${this.baseUrl2}/Approve/Subscriber/${userEmail}`);
  }

  GetCardInfo(cardNumber: string) {
    return this._http
      .get<ICardResponse>(
        `${this.subscriberUrl}/GetCard?cardNumber=${cardNumber}`
      )
      .pipe(
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
}
