import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ICreateOfferRequest,
  ICreateOfferResponse,
  IOfferResponse,
} from '../shared/interfaces/OffersDtos';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  private baseUrl = environment.baseURL + '/api/offer';

  constructor(private _http: HttpClient) {}

  CreateOffer(createOfferRequest: ICreateOfferRequest) {
    const data = new FormData();
    data.append('description', createOfferRequest.description);
    data.append('photo', createOfferRequest.photo);

    return this._http.post<ICreateOfferResponse>(this.baseUrl, data);
  }

  GetAllActiveOffers() {
    return this._http.get<IOfferResponse[]>(`${this.baseUrl}/active`);
  }
}
