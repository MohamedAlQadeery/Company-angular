import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PlanService } from 'src/app/services/plan.service';

@Component({
  selector: 'app-plans-list-page',
  templateUrl: './plans-list-page.component.html',
  styleUrls: ['./plans-list-page.component.css'],
})
export class PlansListPageComponent {
  constructor(
    private _planService: PlanService,
    private _toastr: ToastrService
  ) {}
  plans$ = this._planService.GetAllPlans();
  itemsPerPage = 8;
  currentPage = 1;
  HandleOnDelete(id: number) {
    this._planService.DeletePlan(id).subscribe({
      next: (res) => {
        console.log(res);
        this.plans$ = this._planService.GetAllPlans();
        this._toastr.success(
          'Plan has been deleted successfully',
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
