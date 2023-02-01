import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-offer-list-page',
  templateUrl: './offer-list-page.component.html',
  styleUrls: ['./offer-list-page.component.css']
})
export class OfferListPageComponent {
  constructor(
    private _planService: OfferService,
    private _toastr: ToastrService
  ) {}
  plans$ = this._planService.GetAllNotActiveOffers();

  HandleOnActivate(id: number) {
    this._planService.ActiveOfferById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.plans$ = this._planService.GetAllNotActiveOffers();
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
}
