import { Component } from '@angular/core';
import { LangService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  constructor(private _langService: LangService) {}
  currentLang$ = this._langService.currentLang$;
}
