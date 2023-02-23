import { ISubscriberResponse } from './UsersDto';
// planCardColor => 0 Bronze, 1 Silver, 2 Gold

export interface ICardResponse {
  cardNumber: string;
  applicationUserId: string;
  expirationDate: Date;
  applicationUser: ISubscriberResponse;
  planCardColor: number;
  id: number;
  createdAt: Date;
}
