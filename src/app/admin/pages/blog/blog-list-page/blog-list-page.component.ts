import { Component } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BlogService } from 'src/app/services/blog.service';
import { CategoryService } from 'src/app/services/category.service';
import { StaticPageService } from 'src/app/services/static-page.service';
import { ICategoryResponse } from 'src/app/shared/interfaces/CategoryDtos';

@Component({
  selector: 'app-blog-list-page',
  templateUrl: './blog-list-page.component.html',
  styleUrls: ['./blog-list-page.component.css'],
})
export class BlogListPageComponent {
  constructor(
    private _blogService: BlogService,
    private _toastr: ToastrService
  ) {}
  staticPages$ = this._blogService.GetAll();
  itemsPerPage = 8;
  currentPage = 1;
  HandleOnDelete(id: number) {
    this._blogService.Delete(id).subscribe({
      next: (res) => {
        console.log(res);
        this.staticPages$ = this._blogService.GetAll();
        this._toastr.success('deleted successfully', 'Delete Success');
      },
      error: (err) => {
        console.log(err);
        this._toastr.error(err);
      },
    });
  }
}
