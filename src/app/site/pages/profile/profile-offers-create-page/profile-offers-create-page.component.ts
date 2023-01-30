import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { LangService } from 'src/app/services/language.service';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-profile-offers-create-page',
  templateUrl: './profile-offers-create-page.component.html',
  styleUrls: ['./profile-offers-create-page.component.css'],
})
export class ProfileOffersCreatePageComponent implements OnInit {
  constructor(
    private _langService: LangService,
    private _translate: TranslateService,
    private _offerService: OfferService,
    private _toastr: ToastrService,
    private _router: Router
  ) {}
  currentLang$ = this._langService.currentLang$;

  //#region Form Controls
  offerFormGroup: FormGroup;
  descriptionControl = new FormControl('', [Validators.required]);
  photoControl = new FormControl('', [Validators.required]);
  //#endregion
  ngOnInit(): void {
    this.offerFormGroup = new FormGroup({
      description: this.descriptionControl,
      photo: this.photoControl,
    });
  }

  HandleOnSubmit() {
    let messageTitle = this._translate.instant('add-offer');
    let messageContent = this._translate.instant('add-offer-success');
    this._offerService.CreateOffer(this.offerFormGroup.value).subscribe({
      next: (res) => {
        console.log(res);
        this._toastr.success(messageContent, messageTitle);

        this._router.navigate(['/profile/offers']);
      },
      error: (err) => {
        this._toastr.error(err);
      },
    });
  }
}
