import { Component } from '@angular/core';
import { LangService } from 'src/app/services/language.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  constructor(private _langService: LangService) {}
  lang$ = this._langService.currentLang$;
}
