import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  TuiContextWithImplicit,
  TuiStringHandler,
  tuiPure,
} from '@taiga-ui/cdk';
import { TuiAlertService } from '@taiga-ui/core';
import { TuiFileLike } from '@taiga-ui/kit';
import { Subject, Subscription, tap } from 'rxjs';
import Validation from 'src/app/shared/helpers/validation';

@Component({
  selector: 'app-provider-signup',
  templateUrl: './provider-signup.component.html',
  styleUrls: ['./provider-signup.component.css'],
})
export class ProviderSignupComponent implements OnInit {
  //#region Fake Options

  fakeCountries = [
    { id: 1, name: 'Palestine' },
    { id: 2, name: 'UAE' },
  ];

  fakeCities = [
    { id: 1, name: 'Gaza' },
    { id: 2, name: 'Dubai' },
  ];
  fakeCategories = [
    { id: 1, name: 'Food' },
    { id: 2, name: 'Sport' },
  ];

  fakeDiscount = [
    { id: 1, name: 20 },
    { id: 2, name: 10 },
  ];
  //#endregion

  //#region signup form
  signupFormGroup: FormGroup;
  companyNameControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  categoryControl = new FormControl(this.fakeCategories.at(0)?.id, [
    Validators.required,
  ]);
  countryControl = new FormControl(this.fakeCountries.at(0)?.id, [
    Validators.required,
  ]);
  cityControl = new FormControl(this.fakeCities.at(0)?.id, [
    Validators.required,
  ]);

  addressControl = new FormControl('', [Validators.required]);
  googleLocationControl = new FormControl('', [Validators.required]);
  websiteControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);
  confirmPasswordControl = new FormControl('', [Validators.required]);
  phoneControl = new FormControl('', [Validators.required]);
  discount = new FormControl(0, [Validators.required]);
  logoControl = new FormControl('', [Validators.required]);
  photoControl = new FormControl('', [Validators.required]);

  //#endregion

  //#region Subscriptions
  alertSub: Subscription;
  //#endregion
  constructor(
    private _alertService: TuiAlertService,
    private _translate: TranslateService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this.signupFormGroup = new FormGroup(
      {
        companyName: this.companyNameControl,
        email: this.emailControl,
        country: this.countryControl,
        category: this.categoryControl,
        city: this.cityControl,
        address: this.cityControl,
        googleLocation: this.googleLocationControl,
        website: this.googleLocationControl,
        password: this.passwordControl,
        confirmPassword: this.confirmPasswordControl,
        phone: this.phoneControl,
        discount: this.discount,
        logo: this.logoControl,
        photo: this.photoControl,
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }

  HandleOnSubmit() {
    console.log(this.signupFormGroup.value);
    let messageTitle = this._translate.instant('provider-success-signup-title');
    let messageContent = this._translate.instant('success-signup-content');
    this.alertSub = this._alertService
      .open(messageContent, { label: messageTitle })
      .subscribe();

    this._router.navigate(['/']);
  }

  ngOnDestroy(): void {}
}
