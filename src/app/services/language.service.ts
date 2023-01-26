import { Injectable, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  private currentLangSubject = new BehaviorSubject<string>('en');
  public currentLang$ = this.currentLangSubject.asObservable();

  constructor() {
    if (this.isCurrentLanguageSet()) {
      this.currentLangSubject.next(this.GetLangFromStorage());
    }
  }
  public setCurrentLanguage(language: string) {
    localStorage.setItem('current_lang', language);
    this.currentLangSubject?.next(language);
  }

  isCurrentLanguageSet() {
    const lang = localStorage.getItem('current_lang');
    if (!lang) return false;

    return true;
  }

  GetLangFromStorage() {
    const lang = localStorage.getItem('current_lang')!;
    return lang;
  }
}
