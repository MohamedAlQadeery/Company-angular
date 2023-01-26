import { Component, EventEmitter, Output, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
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
    translate.use('en');
  }

  currentLang$ = this._langService.currentLang$;
  isLoggedIn$ = this._authService.isLoggedin$;
  changeLanguage(language: string) {
    this.translate.use(language);

    if (language === 'ar') {
      this.renderer.setAttribute(document.body, 'dir', 'rtl');
    } else {
      this.renderer.removeAttribute(document.body, 'dir');
    }
    this._langService.setCurrentLanguage(language);
  }

  HandleLogOut() {
    this._authService.Logout();
    this._router.navigate(['/']);
    this._toastr.success('تم تسجيل الخروج بنجاح', 'تسجيل الخروج', {
      positionClass: 'toast-top-center',
    });
  }
}
