import { Component, EventEmitter, Output, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from 'src/app/services/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private translate: TranslateService,
    private renderer: Renderer2,
    private _langService: LangService
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  currentLang$ = this._langService.currentLang$;
  changeLanguage(language: string) {
    this.translate.use(language);

    if (language === 'ar') {
      this.renderer.setAttribute(document.body, 'dir', 'rtl');
    } else {
      this.renderer.removeAttribute(document.body, 'dir');
    }
    this._langService.setCurrentLanguage(language);
  }
}
