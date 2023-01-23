import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { IPlanResponse } from 'src/app/shared/interfaces/PlanDtos';

@Component({
  selector: 'app-plans-edit-page',
  templateUrl: './plans-edit-page.component.html',
  styleUrls: ['./plans-edit-page.component.css'],
})
export class PlansEditPageComponent {
  constructor(
    private _activedRoute: ActivatedRoute,
    private _router: Router,
    private _toastr: ToastrService
  ) {}
  plan$: Observable<IPlanResponse>;
  planId: number;

  planFormGroup: FormGroup;
  nameControl = new FormControl('', [Validators.required]);
  priceControl = new FormControl(0, [Validators.required]);
  durationControl = new FormControl(0, [Validators.required]);
  postsPerMonthContorl = new FormControl(0, [Validators.required]);

  ngOnInit(): void {
    this.planFormGroup = new FormGroup({
      name: this.nameControl,
      price: this.priceControl,
      duration: this.durationControl,
      postPerMonth: this.postsPerMonthContorl,
      // features: new FormArray([]),
    });
    this._activedRoute.paramMap.subscribe((para) => {
      this.planId = +para.get('id')!;
    });

    // this.plan$ = this._planService.GetplanById(this.planId).pipe(
    //   tap((plan: IPlanResponse) => {
    //     this.nameControl.setValue(plan.name);
    //     this.priceControl.setValue(plan.price);
    //     this.durationControl.setValue(plan.duration);
    //     this.postsPerMonthContorl.setValue(plan.postsPerMonth);
    //   })
    // );
  }

  HandleOnSubmit() {
    // const updateRequest: IUpdateplanRequest = {
    //   id: this.planId,
    // };
    // this._planService.Updateplan(updateRequest, this.planId).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     this._toastr.success(
    //       `${res.name} has been updated successfully !`,
    //       'plan Updated'
    //     );
    //     this._router.navigate(['/admin/plan']);
    //   },
    //   error: (err) => {
    //     this._toastr.error(err);
    //   },
    // });
  }
}
