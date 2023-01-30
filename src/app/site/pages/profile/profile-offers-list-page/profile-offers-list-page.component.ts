import { Component } from '@angular/core';
import { LangService } from 'src/app/services/language.service';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-profile-offers-list-page',
  templateUrl: './profile-offers-list-page.component.html',
  styleUrls: ['./profile-offers-list-page.component.css'],
})
export class ProfileOffersListPageComponent {
  constructor(
    private _langService: LangService,
    private _offerService: OfferService
  ) {}
  lang$ = this._langService.currentLang$;
  offers$ = this._offerService.GetUserActiceOffers();
}
