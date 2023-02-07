import { Component } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-articles-list-page',
  templateUrl: './articles-list-page.component.html',
  styleUrls: ['./articles-list-page.component.css'],
})
export class ArticlesListPageComponent {
  constructor(private _articleService: ArticleService) {}
  posts$ = this._articleService.GetAll();
  currentPage = 1;
  itemsPerPage = 8;
}
