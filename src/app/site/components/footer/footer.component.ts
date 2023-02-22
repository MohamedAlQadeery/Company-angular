import { Component, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs';
import { LangService } from 'src/app/services/language.service';
import { WebSiteInfoService } from 'src/app/services/webSiteInfo.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  constructor(
    private _langService: LangService,
    private translate: TranslateService,
    private renderer: Renderer2,
    private _infoService: WebSiteInfoService
  ) {}

  //#region Language <ul>
  showLanguageList = false;
  languageSpanText = 'English';
  //#endregion
  info$ = this._infoService.GetById(1);

  //#endregion
  currentLang$ = this._langService.currentLang$.pipe(
    tap((lang) => {
      if (lang === 'ar') {
        this.languageSpanText = 'Arabic';
      } else {
        this.languageSpanText = lang == 'en' ? 'English' : 'Turkish';
      }
    })
  );

  changeLanguage(language: string) {
    this.translate.use(language);

    if (language === 'ar') {
      this.renderer.setAttribute(document.body, 'dir', 'rtl');
    } else {
      this.renderer.removeAttribute(document.body, 'dir');
    }
    this._langService.setCurrentLanguage(language);
    this.showLanguageList = false;
  }

  ToggleLanguageList() {
    this.showLanguageList = !this.showLanguageList;
  }
}
