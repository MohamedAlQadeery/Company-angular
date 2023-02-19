import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { LangService } from 'src/app/services/language.service';
import { StaticPageService } from 'src/app/services/static-page.service';
import { StaticPage } from 'src/app/shared/interfaces/StaticPage';

@Component({
  selector: 'app-static-page',
  templateUrl: './static-page.component.html',
  styleUrls: ['./static-page.component.css'],
})
export class StaticPageComponent implements OnInit {
  constructor(
    private _staticPageService: StaticPageService,
    private _route: ActivatedRoute,
    private _langService: LangService
  ) {}

  pageName: string;
  page$: Observable<StaticPage>;
  lang$ = this._langService.currentLang$;
  ngOnInit(): void {
    // this._route.paramMap.subscribe((para) => {
    //   this.pageName = para.get('pageName')!;
    //   console.log(this.pageName);
    // });

    this.page$ = this._route.paramMap.pipe(
      switchMap((para) => {
        this.pageName = para.get('pageName')!;

        return this._staticPageService.GetPageByName(this.pageName);
      })
    );
  }
}
