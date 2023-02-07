import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-details-page',
  templateUrl: './article-details-page.component.html',
  styleUrls: ['./article-details-page.component.css'],
})
export class ArticleDetailsPageComponent {
  constructor(
    private _articleService: ArticleService,
    private _route: ActivatedRoute
  ) {}

  post$ = this._route.paramMap.pipe(
    switchMap((para) => {
      let id = para.get('id')!;
      return this._articleService.GetById(+id);
    })
  );
}
