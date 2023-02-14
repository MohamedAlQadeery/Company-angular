import { Component, Renderer2 } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { timeout } from 'rxjs';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private _router: Router,
    private _loadingService: LoadingService
  ) {}
  title = 'company';
  loader$ = this._loadingService.loader$;
}
