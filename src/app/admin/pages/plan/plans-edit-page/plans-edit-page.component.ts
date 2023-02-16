import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { PlanService } from 'src/app/services/plan.service';
import { IPlanResponse, IUpdatePlanRequest } from 'src/app/shared/interfaces/PlanDtos';

@Component({
  selector: 'app-plans-edit-page',
  templateUrl: './plans-edit-page.component.html',
  styleUrls: ['./plans-edit-page.component.css'],
})
export class PlansEditPageComponent {
  planTypeOpts = [{ id: 1, name: 'Normal User' }
  ,
  { id: 2, name: 'Subscriber' }
  ,{ id: 3, name: 'Provider' }
  ];
  constructor(
    private _activedRoute: ActivatedRoute,
    private _router: Router,
    private _planService: PlanService,
    private _toastr: ToastrService
  ) {}
  plan$: Observable<IPlanResponse>;
  planId: number;

  planFormGroup: FormGroup;
  nameControl = new FormControl('', [Validators.required]);
  nameARControl = new FormControl('', [Validators.required]);
  nameTRControl = new FormControl('', [Validators.required]);
  priceControl = new FormControl(0, [Validators.required]);
  durationControl = new FormControl(0, [Validators.required]);
  postsPerMonthContorl = new FormControl(0, [Validators.required]);
  offerPerMonthContorl = new FormControl(0, [Validators.required]);
  planTypeContorl = new FormControl(1, [Validators.required]);

  ngOnInit(): void {
    this.planFormGroup = new FormGroup({
      name: this.nameControl,
      nameAR: this.nameARControl,
      nameTR: this.nameTRControl,
      price: this.priceControl,
      duration: this.durationControl,
      servicePerMonth: this.postsPerMonthContorl,
      offerPerMonth: this.offerPerMonthContorl,
      planType: this.planTypeContorl,
      // features: new FormArray([]),
    });
    this._activedRoute.paramMap.subscribe((para) => {
      this.planId = +para.get('id')!;
    });
     
    this.plan$ = this._planService.GetPlanById(this.planId).pipe(
      tap((plan: IPlanResponse) => {
        this.nameControl.setValue(plan.name);
        this.nameARControl.setValue(plan.nameAR);
        this.nameTRControl.setValue(plan.nameTR);
        this.priceControl.setValue(plan.price);
        this.durationControl.setValue(plan.duration);
        this.postsPerMonthContorl.setValue(plan.servicePerMonth);
        this.planTypeContorl.setValue(plan.planType);
      })
    );
  }

  HandleOnSubmit() {
    const updateRequest: IUpdatePlanRequest = this.planFormGroup.value;
    updateRequest.id = this.planId;
    this._planService.UpdatePlan(updateRequest, this.planId).subscribe({
      next: (res) => {
        console.log(res);
        this._toastr.success(
          `${res.name} has been updated successfully !`,
          'plan Updated'
        );
        this._router.navigate(['/admin/plans']);
      },
      error: (err) => {
        this._toastr.error(err);
      },
    });
  }
}
