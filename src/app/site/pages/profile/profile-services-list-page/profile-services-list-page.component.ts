import { Component } from '@angular/core';
import { LangService } from 'src/app/services/language.service';

@Component({
  selector: 'app-profile-services-list-page',
  templateUrl: './profile-services-list-page.component.html',
  styleUrls: ['./profile-services-list-page.component.css'],
})
export class ProfileServicesListPageComponent {
  constructor(private _langService: LangService) {}
  lang$ = this._langService.currentLang$;
}
