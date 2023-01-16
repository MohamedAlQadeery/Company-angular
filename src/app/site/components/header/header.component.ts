import { Component, EventEmitter, Output, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() currentLangEvent = new EventEmitter<string>();
  currentLang = 'en';

  constructor(
    private translate: TranslateService,
    private renderer: Renderer2
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  changeLanguage(language: string) {
    this.translate.use(language);
    this.currentLang = language;

    if (language === 'ar') {
      this.renderer.setAttribute(document.body, 'dir', 'rtl');
    } else {
      this.renderer.removeAttribute(document.body, 'dir');
    }

    this.currentLangEvent?.emit(language);
  }
}
