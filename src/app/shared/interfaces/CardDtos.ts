import { ISubscriberResponse, IUserRespose } from './UsersDto';

export interface ICardResponse {
  cardNumber: string;
  applicationUserId: string;
  expirationDate: Date;
  applicationUser: ISubscriberResponse;
  id: number;
  createdAt: Date;
}
