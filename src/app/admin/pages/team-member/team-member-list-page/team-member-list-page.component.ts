import { Component } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { StaticPageService } from 'src/app/services/static-page.service';
import { TeamMemberService } from 'src/app/services/team-member.service';
import { ICategoryResponse } from 'src/app/shared/interfaces/CategoryDtos';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-team-member-list-page',
  templateUrl: './team-member-list-page.component.html',
  styleUrls: ['./team-member-list-page.component.css'],
})
export class TeamMemberListPageComponent {
  constructor(
    private _teamMemberService: TeamMemberService,
    private _toastr: ToastrService
  ) {}
  baseUrl = environment.baseURL;
  imagePaths = environment.images;
  staticPages$ = this._teamMemberService.GetAll();
  itemsPerPage = 8;
  currentPage = 1;

  HandleOnDelete(id: number) {
    this._teamMemberService.Delete(id).subscribe({
      next: (res) => {
        console.log(res);
        this.staticPages$ = this._teamMemberService.GetAll();
        this._toastr.success('deleted successfully', 'Delete Success');
      },
      error: (err) => {
        console.log(err);
        this._toastr.error(err);
      },
    });
  }
}
