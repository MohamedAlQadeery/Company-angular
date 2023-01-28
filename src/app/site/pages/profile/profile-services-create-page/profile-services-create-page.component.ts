import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LangService } from 'src/app/services/language.service';

@Component({
  selector: 'app-profile-services-create-page',
  templateUrl: './profile-services-create-page.component.html',
  styleUrls: ['./profile-services-create-page.component.css'],
})
export class ProfileServicesCreatePageComponent implements OnInit {
  constructor(private _langService: LangService) {}
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
    console.log(this.serviceFormGroup.value);
  }
}
