import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LangService } from 'src/app/services/language.service';
import { ProviderServiceService } from 'src/app/services/provider-service.service';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-profile-services-create-page',
  templateUrl: './profile-services-create-page.component.html',
  styleUrls: ['./profile-services-create-page.component.css'],
})
export class ProfileServicesCreatePageComponent implements OnInit {
  constructor(
    private _langService: LangService,
    private _servicesService: ProviderServiceService,
    private _toastr: ToastrService,
    private _router: Router
  ) {}
  currentLang$ = this._langService.currentLang$;

  //#region Form Controls
  serviceFormGroup: FormGroup;
  titleFormControl = new FormControl('', [Validators.required]);
  descriptionControl = new FormControl('', [Validators.required]);
  //#endregion
  ngOnInit(): void {
    this.serviceFormGroup = new FormGroup({
      title: this.titleFormControl,
      description: this.descriptionControl,
    });
  }

  HandleOnSubmit() {
    this._servicesService.CreateService(this.serviceFormGroup.value).subscribe({
      next: (res) => {
        console.log(res);
        this._toastr.success(
          'Services is added successfully! Waiting for admin to approve',
          'Add Service'
        );

        this._router.navigate(['/profile/services']);
      },
      error: (err) => {
        this._toastr.error(err);
      },
    });
  }
}
