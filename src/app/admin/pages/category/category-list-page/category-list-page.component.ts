import { Component } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { ICategoryResponse } from 'src/app/shared/interfaces/CategoryDtos';

@Component({
  selector: 'app-category-list-page',
  templateUrl: './category-list-page.component.html',
  styleUrls: ['./category-list-page.component.css'],
})
export class CategoryListPageComponent {
  constructor(
    private _categoryService: CategoryService,
    private _toastr: ToastrService
  ) {}
  categories$ = this._categoryService.GetAllCategories();

  HandleOnDelete(id: number) {
    this._categoryService.DeleteCategory(id).subscribe({
      next: (res) => {
        console.log(res);
        this.categories$ = this._categoryService.GetAllCategories();
        this._toastr.success(
          'Category has been deleted successfully',
          'Delete Success'
        );
      },
      error: (err) => {
        console.log(err);
        this._toastr.error(err);
      },
    });
  }
}
