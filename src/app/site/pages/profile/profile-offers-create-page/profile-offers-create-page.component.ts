import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LangService } from 'src/app/services/language.service';

@Component({
  selector: 'app-profile-offers-create-page',
  templateUrl: './profile-offers-create-page.component.html',
  styleUrls: ['./profile-offers-create-page.component.css'],
})
export class ProfileOffersCreatePageComponent implements OnInit {
  constructor(private _langService: LangService) {}
  currentLang$ = this._langService.currentLang$;

  //#region Form Controls
  offerFormGroup: FormGroup;
  descriptionControl = new FormControl('', [Validators.required]);
  photoControl = new FormControl('', [Validators.required]);
  //#endregion
  ngOnInit(): void {
    this.offerFormGroup = new FormGroup({
      description: this.descriptionControl,
      photo: this.photoControl,
    });
  }

  HandleOnSubmit() {
    console.log(this.offerFormGroup.value);
  }
}
