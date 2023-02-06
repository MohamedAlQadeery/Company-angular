import { Component } from '@angular/core';
import {
  ActivatedRoute,
  ActivationStart,
  NavigationEnd,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { filter } from 'rxjs';
import { LangService } from 'src/app/services/language.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  constructor(private _langService: LangService) {}
  currentLang$ = this._langService.currentLang$;
}
