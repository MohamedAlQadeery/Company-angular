import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TuiDay } from '@taiga-ui/cdk';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { CountryService } from 'src/app/services/country.service';
import { PlanService } from 'src/app/services/plan.service';
import { UserService } from 'src/app/services/user.service';
import Validation from 'src/app/shared/helpers/validation';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css'],
})
export class UserSignupComponent {
  //#region  Options

  genders = [
    { id: 2, name: 'male' },
    { id: 3, name: 'female' },
  ];

  //#endregion

  //#region signup form
  userFormGroup: FormGroup;
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
  termControl = new FormControl(false, [Validators.requiredTrue]);

  //#endregion

  //#region Observables
  countries$: Observable<{ id: number | string; name: string }[]>;
  cites$: Observable<{ id: number | string; name: string }[]>;
  categories$: Observable<{ id: number; name: string }[]>;
  plans$: Observable<{ id: number; name: string }[]>;

  //#endregion
  constructor(
    private _translate: TranslateService,
    private _categoryService: CategoryService,
    private _countryService: CountryService,
    private _planService: PlanService,
    private _router: Router,
    private _toastr: ToastrService,
    private _userService: UserService,
    private _authService: AuthService
  ) {}
  ngOnInit(): void {
    if (this._authService.isAuthenticated()) {
      this._router.navigate(['/']);
    }

    this.userFormGroup = new FormGroup(
      {
        firstName: this.firstNameControl,
        middleName: this.midNameControl,
        lastName: this.lastNameControl,
        genderId: this.genderControl,
        // nationality: this.nationalityControl,
        email: this.emailControl,
        birthDate: this.dobControl,
        city: this.cityControl,
        country: this.countryControl,
        addressOne: this.addressControl,
        password: this.passwordControl,
        confirmPassword: this.confirmPasswordControl,
        phoneNumber: this.phoneControl,
        planId: this.planControl,
        InformationFile: this.fileControl,
        term: this.termControl,
      },

      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );

    this.countries$ = this._countryService.GetAllCountries().pipe(
      map((res) => {
        return res.map((c) => ({ id: c.iso2, name: c.name }));
      })
    );
    this.plans$ = this._planService.GetAllPlans().pipe(
      map((res) => {
        const subPlans = res.filter((p) => p.planType == 1); //normal user 1
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
    const dob: TuiDay = this.userFormGroup.value['birthDate'];

    let formValues = Object.assign({}, this.userFormGroup.value);
    //taiga ui date input bug were you should add 1 for month
    formValues.birthDate = `${dob.year}/${dob.month + 1}/${dob.day}`;

    console.log(formValues);
    console.log('-----------------');

    let messageTitle = this._translate.instant('user-success-signup-title');
    let messageContent = this._translate.instant('success-signup-content');

    this._userService.RegisterNormalUser(formValues).subscribe({
      next: (res) => {
        console.log(res);
        this._toastr.success(messageContent, messageTitle);
        this._router.navigate(['/']);
      },
      error: (err) => {
        console.log(err.error.errors);
        this._toastr.error(err.error.errors);
      },
    });
  }
}
