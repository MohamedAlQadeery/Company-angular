import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LangService } from 'src/app/services/language.service';
import { PlanService } from 'src/app/services/plan.service';
import { TeamMemberService } from 'src/app/services/team-member.service';
import { IPlanResponse } from 'src/app/shared/interfaces/PlanDtos';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private _langService: LangService,
    private _planService: PlanService,
    private _teamService: TeamMemberService
  ) {}

  lang$ = this._langService.currentLang$;
  teamImageUrl = environment.baseURL + environment.images.med;
  teamMembers$ = this._teamService.GetAll();
  teamSliderConfig = {
    autoplay: false,
    autoplaySpeed: 4000,
    dots: true,
    fade: false,
    arrows: false,
    centeredSlides: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  //#region Pricing
  userPlans: IPlanResponse[] = [];
  subsriberPlans: IPlanResponse[] = [];
  providerPlans: IPlanResponse[] = [];
  plans$: Observable<IPlanResponse[]>;

  //#endregion

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
