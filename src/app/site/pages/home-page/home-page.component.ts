import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { FaqService } from 'src/app/services/faq.service';
import { GeneralServiceService } from 'src/app/services/general-service.service';
import { LangService } from 'src/app/services/language.service';
import { PlanService } from 'src/app/services/plan.service';
import { ProviderService } from 'src/app/services/provider.service';
import { TeamMemberService } from 'src/app/services/team-member.service';
import { WebSiteInfoService } from 'src/app/services/webSiteInfo.service';
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
    private _teamService: TeamMemberService,
    private _faqService: FaqService,
    private _genralServices: GeneralServiceService,
    private _providerServices: ProviderService,
    private _router: Router,
    private _infoService: WebSiteInfoService
  ) {}

  lang$ = this._langService.currentLang$;
  teamImageUrl = environment.baseURL + environment.images.med;
  teamMembers$ = this._teamService.GetAll();

  imagesUrl = `${environment.baseURL}/images/thumbs/small`;

  //#region Sliders Configs
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
  logosSliderConfig = {
    autoplay: true,
    autoplaySpeed: 4000,
    dots: false,
    fade: false,
    arrows: false,
    centeredSlides: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
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
  //#endregion

  //#region Pricing
  userPlans: IPlanResponse[] = [];
  subsriberPlans: IPlanResponse[] = [];
  providerPlans: IPlanResponse[] = [];
  plans$: Observable<IPlanResponse[]>;

  //#endregion

  //#region Faq
  faq$ = this._faqService.GetAll();
  langMap = {
    en: 'English',
    ar: 'Arabic',
    tr: 'Turkish',
  };
  //#endregion

  //#region Observables
  generalServices$ = this._genralServices
    .GetAll()
    .pipe(map((res) => res.slice(0, 4)));

  providers$ = this._providerServices
    .GetAllProviders()
    .pipe(map((res) => res.slice(0, 8)));

  info$ = this._infoService.GetById(1);
  //#endregion

  //#region Search FormControl
  searchFormGroup: FormGroup;

  //#endregion
  ngOnInit(): void {
    this.plans$ = this._planService.GetAllPlans().pipe(
      tap((res) => {
        this.userPlans = res.filter((p) => p.planType == 1);
        this.subsriberPlans = res.filter((p) => p.planType == 2);
        this.providerPlans = res.filter((p) => p.planType == 3);
      })
    );

    this.searchFormGroup = new FormGroup({
      name: new FormControl(''),
    });
  }

  HandleOnSubmit() {
    const providerName = this.searchFormGroup.value['name'];
    this.searchFormGroup.reset();
    this._router.navigate(['/providers'], {
      queryParams: { name: providerName },
    });
  }
}
