import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, debounce, debounceTime, map, switchMap, tap } from 'rxjs';
import { LangService } from 'src/app/services/language.service';
import { OfferService } from 'src/app/services/offer.service';
import { IOfferResponse } from 'src/app/shared/interfaces/OffersDtos';

@Component({
  selector: 'app-offers-page',
  templateUrl: './offers-page.component.html',
  styleUrls: ['./offers-page.component.css'],
})
export class OffersPageComponent implements OnInit {
  constructor(
    private _offerService: OfferService,
    private _langService: LangService
  ) {}
  offers$: Observable<IOfferResponse[]> =
    this._offerService.GetAllActiveOffers();

  lang$ = this._langService.currentLang$;

  searchFormGroup: FormGroup;
  ngOnInit(): void {
    this.searchFormGroup = new FormGroup({
      search: new FormControl(''),
    });
  }

  HandleOnSubmit() {
    this.offers$ = this._offerService.GetAllOffers().pipe(
      tap((res) => {
        console.log(res);
      }),
      map((res) =>
        res.filter((of) =>
          of.applicationUser.companyName
            .toLowerCase()
            .includes(this.searchFormGroup.value['search'])
        )
      ),
      tap((res) => {
        console.log(res);
      })
    );
  }
}
