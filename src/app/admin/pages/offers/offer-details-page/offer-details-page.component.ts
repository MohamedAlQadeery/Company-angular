import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { OfferService } from 'src/app/services/offer.service';
import { IOfferResponse } from 'src/app/shared/interfaces/OffersDtos';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-offer-details-page',
  templateUrl: './offer-details-page.component.html',
  styleUrls: ['./offer-details-page.component.css'],
})
export class OfferDetailsPageComponent implements OnInit {
  constructor(
    private _offerService: OfferService,
    private _activeRoute: ActivatedRoute
  ) {}

  imagesUrl = `${environment.baseURL}/images/thumbs/big`;
  offer$: Observable<IOfferResponse>;

  ngOnInit(): void {
    this._activeRoute.paramMap.subscribe((param) => {
      let id = param.get('id')!;
      this.offer$ = this._offerService.GetOfferById(+id);
    });
  }
}
