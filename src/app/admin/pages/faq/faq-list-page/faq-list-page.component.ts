import { Component } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { FaqService } from 'src/app/services/faq.service';
import { StaticPageService } from 'src/app/services/static-page.service';
import { ICategoryResponse } from 'src/app/shared/interfaces/CategoryDtos';

@Component({
  selector: 'app-faq-list-page',
  templateUrl: './faq-list-page.component.html',
  styleUrls: ['./faq-list-page.component.css'],
})
export class FaqListPageComponent {
  constructor(
    private _faqService: FaqService,
    private _toastr: ToastrService
  ) {}
  staticPages$ = this._faqService.GetAll();

  HandleOnDelete(id: number) {
    this._faqService.Delete(id).subscribe({
      next: (res) => {
        console.log(res);
        this.staticPages$ = this._faqService.GetAll();
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
