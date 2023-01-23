import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ICreatePlanRequest } from 'src/app/shared/interfaces/PlanDtos';
@Component({
  selector: 'app-plans-create-page',
  templateUrl: './plans-create-page.component.html',
  styleUrls: ['./plans-create-page.component.css'],
})
export class PlansCreatePageComponent implements OnInit {
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

    const description = this.planFormGroup.controls['features']
      .value as FormArray;
    //console.log(planData);
  }
}
