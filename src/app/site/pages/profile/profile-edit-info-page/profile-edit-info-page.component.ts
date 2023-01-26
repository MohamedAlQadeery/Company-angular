import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, switchMap } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-profile-edit-info-page',
  templateUrl: './profile-edit-info-page.component.html',
  styleUrls: ['./profile-edit-info-page.component.css'],
})
export class ProfileEditInfoPageComponent implements OnInit {
  constructor(
    private _categoryService: CategoryService,
    private _countryService: CountryService
  ) {}
  profileFormGroup: FormGroup;
  userType: number = 3; // 1 user , 2 subscripber ,3 provider

  //#region Options
  genders = [
    { id: 1, name: 'male' },
    { id: 2, name: 'female' },
  ];

  //#endregion

  //#region Observables
  categories$: Observable<{ id: number; name: string }[]>;

  countries$: Observable<{ id: number | string; name: string }[]>;
  cites$: Observable<{ id: number | string; name: string }[]>;
  //#endregion
  //#region Provider FormControls
  companyNameControl = new FormControl('', [Validators.required]);
  categoryControl = new FormControl('', [Validators.required]);
  countryControl = new FormControl('', [Validators.required]);
  cityControl = new FormControl('', [Validators.required]);
  addressControl = new FormControl('', [Validators.required]);
  googleLocationControl = new FormControl('', [Validators.required]);
  websiteControl = new FormControl('', [Validators.required]);
  phoneControl = new FormControl('', [Validators.required]);
  logoControl = new FormControl('');
  photoControl = new FormControl('');
  //#endregion

  //#region Subscriber FormControls

  sFirstNameControl = new FormControl('', [Validators.required]);
  sMidNameControl = new FormControl('', [Validators.required]);
  sLastNameControl = new FormControl('', [Validators.required]);
  sGenderControl = new FormControl('', [Validators.required]);
  sCountryControl = new FormControl('', [Validators.required]);
  sCityControl = new FormControl('', [Validators.required]);
  sAddressControl = new FormControl('', [Validators.required]);
  sDobControl = new FormControl('', [Validators.required]);
  sPhoneControl = new FormControl('', [Validators.required]);
  sFileControl = new FormControl('');

  //#endregion

  ngOnInit(): void {
    this.initFormGroup(this.userType);

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

  initFormGroup(userType: number) {
    if (userType == 2) {
      // user is subscriber
      this.profileFormGroup = new FormGroup({
        firstName: this.sFirstNameControl,
        midName: this.sMidNameControl,
        lastName: this.sLastNameControl,
        gender: this.sGenderControl,
        dob: this.sDobControl,
        city: this.cityControl,
        address: this.cityControl,
        phone: this.phoneControl,
        file: this.sFileControl,
      });
    } else if (userType == 3) {
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
      });
    }
  }

  HandleOnSubmit() {
    console.log(this.profileFormGroup.value);
  }
}
