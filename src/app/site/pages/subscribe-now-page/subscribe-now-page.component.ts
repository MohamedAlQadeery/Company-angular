import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import Validation from 'src/app/shared/helpers/validation';

@Component({
  selector: 'app-subscribe-now-page',
  templateUrl: './subscribe-now-page.component.html',
  styleUrls: ['./subscribe-now-page.component.css'],
})
export class SubscribeNowPageComponent {
  //#region Fake Options

  fakeCountries = [
    { id: 1, name: 'Palestine' },
    { id: 2, name: 'UAE' },
  ];
  fakeNationailty = [
    { id: 1, name: 'Palestinian' },
    { id: 2, name: 'Emarti' },
  ];

  fakeCities = [
    { id: 1, name: 'Gaza' },
    { id: 2, name: 'Dubai' },
  ];

  genders = [
    { id: 1, name: 'male' },
    { id: 2, name: 'female' },
  ];

  plans = [
    { id: 1, name: 'First Plan' },
    { id: 2, name: 'Second Plan' },
    { id: 3, name: 'Third Plan' },
  ];
  //#endregion

  //#region signup form
  subscribeFormGroup: FormGroup;
  firstNameControl = new FormControl('', [Validators.required]);
  midNameControl = new FormControl('', [Validators.required]);
  lastNameControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  nationalityControl = new FormControl(this.fakeNationailty.at(0)?.id, [
    Validators.required,
  ]);
  genderControl = new FormControl(this.genders.at(0)?.id, [
    Validators.required,
  ]);
  countryControl = new FormControl(this.fakeCountries.at(0)?.id, [
    Validators.required,
  ]);
  cityControl = new FormControl(this.fakeCities.at(0)?.id, [
    Validators.required,
  ]);
  planControl = new FormControl(this.plans.at(0)?.id, [Validators.required]);

  addressControl = new FormControl('', [Validators.required]);
  dobControl = new FormControl(new TuiDay(2023, 1, 1), [Validators.required]);

  passwordControl = new FormControl('', [Validators.required]);
  confirmPasswordControl = new FormControl('', [Validators.required]);
  phoneControl = new FormControl('', [Validators.required]);
  fileControl = new FormControl('', [Validators.required]);

  //#endregion

  ngOnInit(): void {
    this.subscribeFormGroup = new FormGroup(
      {
        firstName: this.firstNameControl,
        midName: this.midNameControl,
        lastName: this.lastNameControl,
        gender: this.genderControl,
        nationality: this.nationalityControl,
        email: this.emailControl,
        dob: this.dobControl,
        city: this.cityControl,
        address: this.cityControl,
        password: this.passwordControl,
        confirmPassword: this.confirmPasswordControl,
        phone: this.phoneControl,
        plan: this.planControl,
        file: this.fileControl,
      },

      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }

  HandleOnSubmit() {
    console.log(this.subscribeFormGroup.value);
    const dob: TuiDay = this.subscribeFormGroup.value['dob'];
    let formValues = Object.assign({}, this.subscribeFormGroup.value);
    formValues.dob = `${dob.year}/${dob.month}/${dob.day}`;
    console.log(formValues);
  }
}
