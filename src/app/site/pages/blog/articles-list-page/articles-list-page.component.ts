import { Component } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { LangService } from 'src/app/services/language.service';

@Component({
  selector: 'app-articles-list-page',
  templateUrl: './articles-list-page.component.html',
  styleUrls: ['./articles-list-page.component.css'],
})
export class ArticlesListPageComponent {
  constructor(
    private _articleService: ArticleService,
    private _langService: LangService
  ) {}
  posts$ = this._articleService.GetAll();
  lang$ = this._langService.currentLang$;
  currentPage = 1;
  itemsPerPage = 8;
}
