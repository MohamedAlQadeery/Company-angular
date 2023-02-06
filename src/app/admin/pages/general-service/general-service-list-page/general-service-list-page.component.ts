import { Component } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { GeneralServiceService } from 'src/app/services/general-service.service';
import { StaticPageService } from 'src/app/services/static-page.service';
import { ICategoryResponse } from 'src/app/shared/interfaces/CategoryDtos';

@Component({
  selector: 'app-general-service-list-page',
  templateUrl: './general-service-list-page.component.html',
  styleUrls: ['./general-service-list-page.component.css'],
})
export class GeneralServiceListPageComponent {
  constructor(
    private _generalService: GeneralServiceService,
    private _toastr: ToastrService
  ) {}
  staticPages$ = this._generalService.GetAll();

  HandleOnDelete(id: number) {
    this._generalService.Delete(id).subscribe({
      next: (res) => {
        console.log(res);
        this.staticPages$ = this._generalService.GetAll();
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
