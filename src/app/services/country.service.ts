import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ICityResponse,
  ICountryResponse,
} from '../shared/interfaces/CountryDtos';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private _http: HttpClient) {}
  countryApiKey = environment.countryApiKey;
  baseUrl = 'https://api.countrystatecity.in/v1';

  GetAllCountries() {
    return this._http.get<ICountryResponse[]>(`${this.baseUrl}/countries`, {
      headers: { 'X-CSCAPI-KEY': this.countryApiKey },
    });
  }

  GetCitiesByCountry(iso2: string) {
    return this._http.get<ICityResponse[]>(
      `${this.baseUrl}/countries/${iso2}/cities`,
      {
        headers: { 'X-CSCAPI-KEY': this.countryApiKey },
      }
    );
  }
}
