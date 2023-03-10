import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-offer-list-page',
  templateUrl: './offer-list-page.component.html',
  styleUrls: ['./offer-list-page.component.css'],
})
export class OfferListPageComponent {
  constructor(
    private _planService: OfferService,
    private _toastr: ToastrService
  ) {}

  itemsPerPage = 8;
  currentPage = 1;
  plans$ = this._planService
    .GetAllNotActiveOffers()
    .pipe(tap((res) => console.log(res)));
    
    activatePlans$ = this._planService
    .GetAllActiveOffers()
    .pipe(tap((res) => console.log(res)));
    
  HandleOnActivate(id: number) {
    this._planService.ActiveOfferById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.plans$ = this._planService.GetAllNotActiveOffers();
        this.activatePlans$ = this._planService.GetAllActiveOffers();
        this._toastr.success(
          'Offer has been Activated successfully',
          'Activated Success'
        );
      },
      error: (err) => {
        console.log(err);
        this._toastr.error(err);
      },
    });
  }

  HandleOnDelete(id: number) {
    this._planService.DeleteOffer(id).subscribe({
      next: (res) => {
        console.log(res);
        this.plans$ = this._planService.GetAllNotActiveOffers();
        this.activatePlans$ = this._planService.GetAllActiveOffers();
        this._toastr.success(
          'Offer has been Deleted successfully',
          'Deleted Success'
        );
      },
      error: (err) => {
        console.log(err);
        this._toastr.error(err);
      },
    });
  }
}
