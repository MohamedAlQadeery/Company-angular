import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contactus-page',
  templateUrl: './contactus-page.component.html',
  styleUrls: ['./contactus-page.component.css'],
})
export class ContactusPageComponent implements OnInit {
  //#region Form Controls
  contactFormGroup: FormGroup;
  nameControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  phoneControl = new FormControl('', [Validators.required]);
  messageControl = new FormControl('', [Validators.required]);
  //#endregion

  ngOnInit(): void {
    this.contactFormGroup = new FormGroup({
      name: this.nameControl,
      emailAddres: this.emailControl,
      phoneNumber: this.phoneControl,
      message: this.messageControl,
    });
  }

  HandleOnSubmit() {
    console.log(this.contactFormGroup.value);
  }
}
