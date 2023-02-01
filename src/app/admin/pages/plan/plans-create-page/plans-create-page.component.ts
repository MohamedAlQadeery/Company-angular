import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICreatePlanRequest } from 'src/app/shared/interfaces/PlanDtos';
import { PlanService } from 'src/app/services/plan.service';
@Component({
  selector: 'app-plans-create-page',
  templateUrl: './plans-create-page.component.html',
  styleUrls: ['./plans-create-page.component.css'],
})
export class PlansCreatePageComponent implements OnInit {
  planTypeOpts = [{ id: 1, name: 'Normal User' }
,
{ id: 2, name: 'Subscriber' }
,{ id: 3, name: 'Provider' }
];
  planFormGroup: FormGroup;
  nameControl = new FormControl('', [Validators.required]);
  priceControl = new FormControl(0, [Validators.required]);
  durationControl = new FormControl(0, [Validators.required]);
  postsPerMonthContorl = new FormControl(0, [Validators.required]);
  offerPerMonthContorl = new FormControl(0, [Validators.required]);
  planTypeContorl = new FormControl(1, [Validators.required]);
  constructor(
    private _planService: PlanService,
    private _router: Router,
    private _toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.planFormGroup = new FormGroup({
      name: this.nameControl,
      price: this.priceControl,
      duration: this.durationControl,
      servicePerMonth: this.postsPerMonthContorl,
      planType: this.planTypeContorl,
      offerPerMonth: this.offerPerMonthContorl,
      // features: new FormArray([]),
    });
  }

  get features() {
    return this.planFormGroup.get('features') as FormArray;
  }

  onAddFeature() {
    const control = new FormControl('', [Validators.required]);
    this.features.push(control);
  }

  HandleOnSubmit() {
    // const planData: ICreatePlanRequest = { ...this.planFormGroup.value };

    // const description = this.planFormGroup.controls['features']
    //   .value as FormArray;
    //console.log(planData);
    this._planService.CreatePlan(this.planFormGroup.value).subscribe({
      next: (res) => {
        console.log(res);
        this._toastr.success(
          `${res.name} has been created successfully !`,
          'Plan Created'
        );

        this._router.navigate(['/admin/plans']);
      },
      error: (error) => {
        this._toastr.error(error);
      },
    });
  }
}
