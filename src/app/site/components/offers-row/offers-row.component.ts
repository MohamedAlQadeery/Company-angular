import { Component, Input } from '@angular/core';
import { IOfferResponse } from 'src/app/shared/interfaces/OffersDtos';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-offers-row',
  templateUrl: './offers-row.component.html',
  styleUrls: ['./offers-row.component.css'],
})
export class OffersRowComponent {
  imagesUrl = `${environment.baseURL}/images/thumbs/med`;
  currentPage = 1;
  @Input() offers: IOfferResponse[];
  @Input() itemsPerPage = 2;
  @Input() lang = 'en';
}
