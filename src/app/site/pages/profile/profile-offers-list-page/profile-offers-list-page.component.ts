import { Component } from '@angular/core';
import { LangService } from 'src/app/services/language.service';

@Component({
  selector: 'app-profile-offers-list-page',
  templateUrl: './profile-offers-list-page.component.html',
  styleUrls: ['./profile-offers-list-page.component.css'],
})
export class ProfileOffersListPageComponent {
  constructor(private _langService: LangService) {}
  lang$ = this._langService.currentLang$;
}
