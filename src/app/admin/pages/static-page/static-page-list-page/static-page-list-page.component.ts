import { Component } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { StaticPageService } from 'src/app/services/static-page.service';
import { ICategoryResponse } from 'src/app/shared/interfaces/CategoryDtos';

@Component({
  selector: 'app-static-page-list-page',
  templateUrl: './static-page-list-page.component.html',
  styleUrls: ['./static-page-list-page.component.css'],
})
export class StaticPageListPageComponent {
  constructor(
    private _staticPageService: StaticPageService,
    private _toastr: ToastrService
  ) {}
  staticPages$ = this._staticPageService.GetAll();

  HandleOnDelete(id: number) {
    this._staticPageService.Delete(id).subscribe({
      next: (res) => {
        console.log(res);
        this.staticPages$ = this._staticPageService.GetAll();
        this._toastr.success(
          'deleted successfully',
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
