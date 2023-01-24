import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PlanService } from 'src/app/services/plan.service';
import { IPlanResponse } from 'src/app/shared/interfaces/PlanDtos';

@Component({
  selector: 'app-pricing-page',
  templateUrl: './pricing-page.component.html',
  styleUrls: ['./pricing-page.component.css'],
})
export class PricingPageComponent implements OnInit {
  constructor(private _planService: PlanService) {}

  userPlans: IPlanResponse[] = [];
  subsriberPlans: IPlanResponse[] = [];
  providerPlans: IPlanResponse[] = [];
  plans$: Observable<IPlanResponse[]>;
  ngOnInit(): void {
    this.plans$ = this._planService.GetAllPlans().pipe(
      tap((res) => {
        this.userPlans = res.filter((p) => p.planType == 1);
        this.subsriberPlans = res.filter((p) => p.planType == 2);
        this.providerPlans = res.filter((p) => p.planType == 3);
      })
    );
  }
}
