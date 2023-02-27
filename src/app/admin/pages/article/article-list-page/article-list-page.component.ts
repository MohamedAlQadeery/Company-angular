import { Component } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/category.service';
import { StaticPageService } from 'src/app/services/static-page.service';
import { ICategoryResponse } from 'src/app/shared/interfaces/CategoryDtos';

@Component({
  selector: 'app-article-list-page',
  templateUrl: './article-list-page.component.html',
  styleUrls: ['./article-list-page.component.css'],
})
export class ArticleListPageComponent {
  constructor(
    private _articleService: ArticleService,
    private _toastr: ToastrService
  ) {}
  staticPages$ = this._articleService.GetAll();
  itemsPerPage = 8;
  currentPage = 1;
  HandleOnDelete(id: number) {
    this._articleService.Delete(id).subscribe({
      next: (res) => {
        console.log(res);
        this.staticPages$ = this._articleService.GetAll();
        this._toastr.success('deleted successfully', 'Delete Success');
      },
      error: (err) => {
        console.log(err);
        this._toastr.error(err);
      },
    });
  }
}
