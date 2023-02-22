import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ContactusService } from 'src/app/services/contactus.service';
import { WebSiteInfoService } from 'src/app/services/webSiteInfo.service';

@Component({
  selector: 'app-contactus-page',
  templateUrl: './contactus-page.component.html',
  styleUrls: ['./contactus-page.component.css'],
})
export class ContactusPageComponent implements OnInit {
  constructor(
    private _toastr: ToastrService,
    private _router: Router,
    private _contactService: ContactusService,
    private _translate: TranslateService,
    private _infoService: WebSiteInfoService
  ) {}

  info$ = this._infoService.GetById(1);
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
    let messageTitle = this._translate.instant('success-message-sent-title');
    let messageContent = this._translate.instant(
      'success-message-sent-content'
    );

    this._contactService.Create(this.contactFormGroup.value).subscribe({
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
