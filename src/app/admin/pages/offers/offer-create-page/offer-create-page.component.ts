import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-offer-create-page',
  templateUrl: './offer-create-page.component.html',
  styleUrls: ['./offer-create-page.component.css'],
})
export class OfferCreatePageComponent {
  offerFormGroup: FormGroup;
  userIdControl = new FormControl('', [Validators.required]);
  companyNameControl = new FormControl('', [Validators.required]);
  logoControl = new FormControl('', [Validators.required]);
  infoControl = new FormControl('', [Validators.required]);
  websiteControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required]);
  phoneControl = new FormControl('', [Validators.required]);

  postsPerMonthContorl = new FormControl(0, [Validators.required]);
  ngOnInit(): void {
    this.offerFormGroup = new FormGroup({
      userId: this.userIdControl,
      companyName: this.companyNameControl,
      logo: this.logoControl,
      info: this.infoControl,
      website: this.websiteControl,
      phone: this.phoneControl,
      // features: new FormArray([]),
    });

    // this.userIdControl.valueChanges.pipe(switchMap((val) => {
    //   return _usersService.GetUserById(+val)
    // }));
  }

  HandleOnSubmit() {
    // const offerData: ICreateofferRequest = { ...this.offerFormGroup.value };
    //console.log(offerData);
  }
}
