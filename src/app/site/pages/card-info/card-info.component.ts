import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { SubscriberService } from 'src/app/services/subscriber.service';
import { ISubscriberResponse } from 'src/app/shared/interfaces/UsersDto';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.css'],
})
export class CardInfoComponent implements OnInit {
  cardQrCode: string;

  constructor(
    private _subsriberService: SubscriberService,
    private _activeRoute: ActivatedRoute
  ) {}
  card$: Observable<{
    cardNumber: string | undefined;
    expirationDate: string;
    applicationUserId: string;
    applicationUser: ISubscriberResponse;
    planCardColor: number;
    id: number;
    createdAt: Date;
  }>;

  ngOnInit(): void {
    this.card$ = this._activeRoute.paramMap.pipe(
      switchMap((para) => {
        let card = para.get('card')!;
        return this._subsriberService.GetCardInfo(card);
      }),
      tap((res) => {
        this.cardQrCode =
          window.origin + `/card/${res.cardNumber?.replaceAll('-', '')}`;
      })
    );
  }
}
