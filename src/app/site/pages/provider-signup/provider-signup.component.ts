import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, Subscription, map, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { CountryService } from 'src/app/services/country.service';
import { PlanService } from 'src/app/services/plan.service';
import { ProviderService } from 'src/app/services/provider.service';
import Validation from 'src/app/shared/helpers/validation';

@Component({
  selector: 'app-provider-signup',
  templateUrl: './provider-signup.component.html',
  styleUrls: ['./provider-signup.component.css'],
})
export class ProviderSignupComponent implements OnInit {
  //#region signup form
  signupFormGroup: FormGroup;
  planControl = new FormControl('', [Validators.required]);

  companyNameControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  categoryControl = new FormControl('', [Validators.required]);
  countryControl = new FormControl('', [Validators.required]);
  cityControl = new FormControl('', [Validators.required]);

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

  //#region Observables
  countries$: Observable<{ id: number | string; name: string }[]>;
  cites$: Observable<{ id: number | string; name: string }[]>;
  categories$: Observable<{ id: number; name: string }[]>;
  plans$: Observable<{ id: number; name: string }[]>;

  //#endregion
  constructor(
    private _toastr: ToastrService,
    private _translate: TranslateService,
    private _router: Router,
    private _countryService: CountryService,
    private _providerService: ProviderService,
    private _categoryService: CategoryService,
    private _planService: PlanService,
    private _authService: AuthService
  ) {}
  ngOnInit(): void {
    if (this._authService.isAuthenticated()) {
      this._router.navigate(['/']);
    }
    this.signupFormGroup = new FormGroup(
      {
        companyName: this.companyNameControl,
        email: this.emailControl,
        country: this.countryControl,
        categoryId: this.categoryControl,
        city: this.cityControl,
        addressOne: this.cityControl,
        googleLocation: this.googleLocationControl,
        website: this.googleLocationControl,
        password: this.passwordControl,
        confirmPassword: this.confirmPasswordControl,
        phoneNumber: this.phoneControl,
        discount: this.discount,
        logoFile: this.logoControl,
        photoFile: this.photoControl,
        planId: this.planControl,
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );

    this.categories$ = this._categoryService.GetAllCategories().pipe(
      map((res) => {
        return res.map((c) => ({ id: c.id, name: c.name }));
      })
    );

    this.plans$ = this._planService.GetAllPlans().pipe(
      map((res) => {
        const subPlans = res.filter((p) => p.planType == 3);
        return subPlans.map((p) => ({ id: p.id, name: p.name }));
      })
    );

    this.countries$ = this._countryService.GetAllCountries().pipe(
      map((res) => {
        return res.map((c) => ({ id: c.iso2, name: c.name }));
      })
    );

    this.cites$ = this.countryControl.valueChanges.pipe(
      switchMap((id) => {
        return this._countryService.GetCitiesByCountry(id!).pipe(
          map((res) => {
            return res.map((c) => ({
              id: c.name,
              name: c.name,
            }));
          })
        );
      })
    );
  }

  HandleOnSubmit() {
    let messageTitle = this._translate.instant('provider-success-signup-title');
    let messageContent = this._translate.instant('success-signup-content');

    this._providerService
      .RegisterProvider(this.signupFormGroup.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this._toastr.success(messageContent, messageTitle);
          this._router.navigate(['/']);
        },
        error: (err) => {
          this._toastr.error(err);
        },
      });
  }

  ngOnDestroy(): void {}
}
