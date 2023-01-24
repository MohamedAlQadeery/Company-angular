export interface ICountryResponse {
  id: number;
  name: string;
  iso2: string;
}

export interface ICityResponse {
  id: number;
  name: string;
  country_code: string;
}
