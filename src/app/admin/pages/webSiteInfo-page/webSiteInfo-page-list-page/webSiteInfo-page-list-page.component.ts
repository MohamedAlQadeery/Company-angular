import { Component } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { StaticPageService } from 'src/app/services/static-page.service';
import { WebSiteInfoService } from 'src/app/services/webSiteInfo.service';
import { ICategoryResponse } from 'src/app/shared/interfaces/CategoryDtos';

@Component({
  selector: 'app-webSiteInfo-page-list-page',
  templateUrl: './webSiteInfo-page-list-page.component.html',
  styleUrls: ['./webSiteInfo-page-list-page.component.css'],
})
export class WebSiteInfoPageListPageComponent {
  constructor(
    private _webSiteInfoService: WebSiteInfoService,
    private _toastr: ToastrService
  ) {}
  webSiteInfos$ = this._webSiteInfoService.GetAll();

  HandleOnDelete(id: number) {
    this._webSiteInfoService.Delete(id).subscribe({
      next: (res) => {
        console.log(res);
        this.webSiteInfos$ = this._webSiteInfoService.GetAll();
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
