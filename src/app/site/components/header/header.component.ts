import { Component, EventEmitter, Output, Renderer2 } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, Scroll } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { filter, map, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
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
    private _langService: LangService,
    private _authService: AuthService,
    private _router: Router,
    private _toastr: ToastrService
  ) {
    translate.setDefaultLang('en');
  }

  isHomePage = false;

  //#region route observable
  route$ = this._router.events.subscribe((res) => {
    if (res instanceof NavigationEnd) {
      const route: NavigationEnd = { ...res };
      console.log(route.url);
      this.isHomePage = route.url === '/' ? true : false;
    }
  });
  //#endregion

  //#region Language <ul>
  showLanguageList = false;
  languageSpanText = 'English';
  //#endregion

  //#region Canvas effects
  showSearchForm = false;
  showCanvasNav = false;

  //#endregion
  currentLang$ = this._langService.currentLang$.pipe(
    tap((lang) => {
      this.translate.use(lang);

      if (lang === 'ar') {
        this.renderer.setAttribute(document.body, 'dir', 'rtl');
        this.languageSpanText = 'Arabic';
      } else {
        this.renderer.removeAttribute(document.body, 'dir');
        this.languageSpanText = lang == 'en' ? 'English' : 'Turkish';
      }
    })
  );

  isLoggedIn$ = this._authService.isLoggedin$;
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

  HandleLogOut() {
    this._authService.Logout();
    this._router.navigate(['/']);
    this._toastr.success('تم تسجيل الخروج بنجاح', 'تسجيل الخروج', {
      positionClass: 'toast-top-center',
    });
  }

  ToggleLanguageList() {
    this.showLanguageList = !this.showLanguageList;
  }

  ToggleSearchForm() {
    this.showSearchForm = !this.showSearchForm;
  }
  ToggleCanvasNav() {
    this.showCanvasNav = !this.showCanvasNav;
  }
}
