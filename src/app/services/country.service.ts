import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ICityResponse,
  ICountryResponse,
} from '../shared/interfaces/CountryDtos';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private _http: HttpClient) {}

  GetAllCountries() {
    return this._http.get<ICountryResponse[]>('assets/data/country.json');
  }

  GetCitiesByCountry(iso2: string) {
    return this._http.get<ICityResponse[]>('assets/data/cities.json').pipe(
      map((res) => {
        return res.filter((c) => c.country_code == iso2);
      })
    );
  }
}
