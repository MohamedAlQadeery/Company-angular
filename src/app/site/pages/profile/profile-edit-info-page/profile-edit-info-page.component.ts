import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { TuiDay } from '@taiga-ui/cdk';
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

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    width: 'auto',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['bold']],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };

  //#region Observables
  categories$: Observable<{ id: number; name: string }[]>;

  countries$: Observable<{ id: number | string; name: string }[]>;
  providerCites$: Observable<{ id: number | string; name: string }[]>;
  subscriberCites$: Observable<{ id: number | string; name: string }[]>;
  //#endregion
  //#region Provider FormControls
  companyNameControl = new FormControl('', [Validators.required]);
  categoryControl = new FormControl(1, [Validators.required]);
  countryControl = new FormControl('');
  cityControl = new FormControl('');
  addressControl = new FormControl('', [Validators.required]);
  googleLocationControl = new FormControl('', [Validators.required]);
  websiteControl = new FormControl('', [Validators.required]);
  phoneControl = new FormControl('', [Validators.required]);
  logoControl = new FormControl('');
  photoControl = new FormControl('');
  descrptionArControl = new FormControl('');
  descrptionEnControl = new FormControl('');
  descrptionTrControl = new FormControl('');
  //#endregion

  //#region Subscriber FormControls

  sFirstNameControl = new FormControl('', [Validators.required]);
  sMidNameControl = new FormControl('', [Validators.required]);
  sLastNameControl = new FormControl('', [Validators.required]);
  sGenderControl = new FormControl(1, [Validators.required]);
  sCountryControl = new FormControl('', [Validators.required]);
  sCityControl = new FormControl('', [Validators.required]);
  sAddressControl = new FormControl('', [Validators.required]);
  sDobControl = new FormControl(new TuiDay(2023, 1, 1), [Validators.required]);
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
          this.descrptionEnControl.setValue(res.description);
          this.descrptionArControl.setValue(res.descriptionAR);
          this.descrptionTrControl.setValue(res.descriptionTR);
        } else {
          this.sFirstNameControl.setValue(res.firstName);
          this.sMidNameControl.setValue(res.middleName);
          this.sLastNameControl.setValue(res.lastName);
          this.sGenderControl.setValue(res.genderId);

          //taiga ui date input bug were you should minus 1 from month
          let date: string[] = res.birthDate?.split('-')!;
          date[2] = date[2].slice(0, 2);
          this.sDobControl.setValue(
            new TuiDay(+date[0], +date[1] - 1, +date[2])
          );
          this.sPhoneControl.setValue(res.phoneNumber);
          this.sCountryControl.setValue(res.country);
          this.sCityControl.setValue(res.city);
          this.sAddressControl.setValue(res.addressOne);
        }
      })
    );
  }

  initFormGroup() {
    if (this.userRole != 'provider') {
      // user is subscriber/normal user
      this.profileFormGroup = new FormGroup({
        firstName: this.sFirstNameControl,
        middleName: this.sMidNameControl,
        lastName: this.sLastNameControl,
        genderId: this.sGenderControl,
        birthDate: this.sDobControl,
        city: this.sCityControl,
        country: this.sCountryControl,
        addressOne: this.sAddressControl,
        phoneNumber: this.sPhoneControl,
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
        phoneNumber: this.phoneControl,
        logoFile: this.logoControl,
        photoFile: this.photoControl,
        description: this.descrptionEnControl,
        descriptionAr: this.descrptionArControl,
        descriptionTr: this.descrptionTrControl,
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
    } else {
      this._userService
        .UpdateSubscriberInfo(this.profileFormGroup.value)
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
