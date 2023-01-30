import { Component } from '@angular/core';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-offers-page',
  templateUrl: './offers-page.component.html',
  styleUrls: ['./offers-page.component.css'],
})
export class OffersPageComponent {
  constructor(private _offerService: OfferService) {}
  offers$ = this._offerService.GetAllActiveOffers();
}
