import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TuiDay } from '@taiga-ui/cdk';
import { TuiAlertService } from '@taiga-ui/core';
import { Observable, map, switchMap } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { CountryService } from 'src/app/services/country.service';
import { PlanService } from 'src/app/services/plan.service';
import Validation from 'src/app/shared/helpers/validation';

@Component({
  selector: 'app-subscribe-now-page',
  templateUrl: './subscribe-now-page.component.html',
  styleUrls: ['./subscribe-now-page.component.css'],
})
export class SubscribeNowPageComponent {
  //#region  Options

  genders = [
    { id: 1, name: 'male' },
    { id: 2, name: 'female' },
  ];

  //#endregion

  //#region signup form
  subscribeFormGroup: FormGroup;
  firstNameControl = new FormControl('', [Validators.required]);
  midNameControl = new FormControl('', [Validators.required]);
  lastNameControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  // nationalityControl = new FormControl('', [Validators.required]);
  genderControl = new FormControl(this.genders.at(0)?.id, [
    Validators.required,
  ]);
  countryControl = new FormControl('', [Validators.required]);
  cityControl = new FormControl('', [Validators.required]);
  planControl = new FormControl('', [Validators.required]);

  addressControl = new FormControl('', [Validators.required]);
  dobControl = new FormControl(new TuiDay(2023, 1, 1), [Validators.required]);

  passwordControl = new FormControl('', [Validators.required]);
  confirmPasswordControl = new FormControl('', [Validators.required]);
  phoneControl = new FormControl('', [Validators.required]);
  fileControl = new FormControl('', [Validators.required]);

  //#endregion

  //#region Observables
  countries$: Observable<{ id: number | string; name: string }[]>;
  cites$: Observable<{ id: number | string; name: string }[]>;
  categories$: Observable<{ id: number; name: string }[]>;
  plans$: Observable<{ id: number; name: string }[]>;

  //#endregion
  constructor(
    private _alertService: TuiAlertService,
    private _translate: TranslateService,
    private _categoryService: CategoryService,
    private _countryService: CountryService,
    private _planService: PlanService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this.subscribeFormGroup = new FormGroup(
      {
        firstName: this.firstNameControl,
        midName: this.midNameControl,
        lastName: this.lastNameControl,
        gender: this.genderControl,
        // nationality: this.nationalityControl,
        email: this.emailControl,
        dob: this.dobControl,
        city: this.cityControl,
        address: this.cityControl,
        password: this.passwordControl,
        confirmPassword: this.confirmPasswordControl,
        phoneNumber: this.phoneControl,
        plan: this.planControl,
        file: this.fileControl,
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

    this.countries$ = this._countryService.GetAllCountries().pipe(
      map((res) => {
        return res.map((c) => ({ id: c.iso2, name: c.name }));
      })
    );
    this.plans$ = this._planService.GetAllPlans().pipe(
      map((res) => {
        const subPlans = res.filter((p) => p.planType == 2);
        return subPlans.map((p) => ({ id: p.id, name: p.name }));
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
    const dob: TuiDay = this.subscribeFormGroup.value['dob'];
    let formValues = Object.assign({}, this.subscribeFormGroup.value);
    formValues.dob = `${dob.year}/${dob.month}/${dob.day}`;
    console.log(formValues);

    let messageTitle = this._translate.instant(
      'subscriber-success-signup-title'
    );
    let messageContent = this._translate.instant('success-signup-content');
    this._alertService
      .open(messageContent, { label: messageTitle, autoClose: false })
      .subscribe();

    this._router.navigate(['/']);
  }
}
