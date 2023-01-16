import { Component, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  currentLang = 'en';

  constructor(
    private translate: TranslateService,
    private renderer: Renderer2
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  changeLanguage(language: string) {
    console.log(language);
    this.translate.use(language);
    this.currentLang = language;

    if (language === 'ar') {
      this.renderer.setAttribute(document.body, 'dir', 'rtl');
    } else {
      this.renderer.removeAttribute(document.body, 'dir');
    }
  }
}
