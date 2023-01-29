import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { CountryService } from 'src/app/services/country.service';
import { UserService } from 'src/app/services/user.service';
import { IUserRespose } from 'src/app/shared/interfaces/UsersDto';

@Component({
  selector: 'app-profile-edit-info-page',
  templateUrl: './profile-edit-info-page.component.html',
  styleUrls: ['./profile-edit-info-page.component.css'],
})
export class ProfileEditInfoPageComponent implements OnInit {
  constructor(
    private _categoryService: CategoryService,
    private _countryService: CountryService,
    private _toastr: ToastrService,
    private _router: Router,
    private _authService: AuthService,
    private _userService: UserService
  ) {}
  profileFormGroup: FormGroup;
  userRole = this._authService.GetUserRole(); // user , subscriber,provider
  userData$: Observable<IUserRespose>;
  //#region Options
  genders = [
    { id: 1, name: 'male' },
    { id: 2, name: 'female' },
  ];

  //#endregion

  //#region Observables
  categories$: Observable<{ id: number; name: string }[]>;

  countries$: Observable<{ id: number | string; name: string }[]>;
  providerCites$: Observable<{ id: number | string; name: string }[]>;
  subscriberCites$: Observable<{ id: number | string; name: string }[]>;
  //#endregion
  //#region Provider FormControls
  companyNameControl = new FormControl('', [Validators.required]);
  categoryControl = new FormControl(1, [Validators.required]);
  countryControl = new FormControl('', [Validators.required]);
  cityControl = new FormControl('', [Validators.required]);
  addressControl = new FormControl('', [Validators.required]);
  googleLocationControl = new FormControl('', [Validators.required]);
  websiteControl = new FormControl('', [Validators.required]);
  phoneControl = new FormControl('', [Validators.required]);
  logoControl = new FormControl('');
  photoControl = new FormControl('');
  descrptionControl = new FormControl('');
  //#endregion

  //#region Subscriber FormControls

  sFirstNameControl = new FormControl('', [Validators.required]);
  sMidNameControl = new FormControl('', [Validators.required]);
  sLastNameControl = new FormControl('', [Validators.required]);
  sGenderControl = new FormControl(1, [Validators.required]);
  sCountryControl = new FormControl('', [Validators.required]);
  sCityControl = new FormControl('', [Validators.required]);
  sAddressControl = new FormControl('', [Validators.required]);
  sDobControl = new FormControl('', [Validators.required]);
  sPhoneControl = new FormControl('', [Validators.required]);
  sFileControl = new FormControl('');

  //#endregion

  ngOnInit(): void {
    this.initFormGroup();

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

    this.providerCites$ = this.countryControl.valueChanges.pipe(
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
    this.subscriberCites$ = this.sCountryControl.valueChanges.pipe(
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

    this.userData$ = this._userService.GetCurrentUserData().pipe(
      tap((res) => {
        console.log(res);
        if (this.userRole == 'provider') {
          this.companyNameControl.setValue(res.companyName);
          this.countryControl.setValue(res.country);
          this.cityControl.setValue(res.city);
          this.addressControl.setValue(res.addressOne);
          this.googleLocationControl.setValue(res.googleLocation);
          this.websiteControl.setValue(res.website);
          this.phoneControl.setValue(res.phoneNumber);
          this.descrptionControl.setValue(res.description);
        } else if (this.userRole == 'subscriber') {
          this.sFirstNameControl.setValue(res.firstName);
          this.sMidNameControl.setValue(res.middleName);
          this.sLastNameControl.setValue(res.lastName);
          this.sGenderControl.setValue(res.genderId);
          this.sDobControl.setValue(res.birthDate);
          this.sPhoneControl.setValue(res.phoneNumber);
          this.sCountryControl.setValue(res.country);
          this.sCityControl.setValue(res.city);
        }
      })
    );
  }

  initFormGroup() {
    if (this.userRole == 'subscriber') {
      // user is subscriber
      this.profileFormGroup = new FormGroup({
        firstName: this.sFirstNameControl,
        midName: this.sMidNameControl,
        lastName: this.sLastNameControl,
        genderId: this.sGenderControl,
        birthDate: this.sDobControl,
        city: this.cityControl,
        address: this.cityControl,
        phone: this.phoneControl,
        file: this.sFileControl,
      });
    } else if (this.userRole == 'provider') {
      // user is provider
      this.profileFormGroup = new FormGroup({
        companyName: this.companyNameControl,
        country: this.countryControl,
        categoryId: this.categoryControl,
        city: this.cityControl,
        addressOne: this.cityControl,
        googleLocation: this.googleLocationControl,
        website: this.googleLocationControl,
        phone: this.phoneControl,
        logoFile: this.logoControl,
        photoFile: this.photoControl,
        description: this.descrptionControl,
      });
    }
  }

  HandleOnSubmit() {
    console.log(this.profileFormGroup.value);
    console.log('-------------------------------');
    if (this.userRole == 'provider') {
      this._userService
        .UpdateProviderInfo(this.profileFormGroup.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            this._toastr.success(
              'Your profile info has been updated successfully,waiting for admin to approve it',
              'Profile Update success'
            );
          },
          error: (err) => {
            console.log(err);
            this._toastr.error(err);
          },
        });
    }
  }
}
