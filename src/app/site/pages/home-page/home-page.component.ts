import { AfterViewInit, Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { LangService } from 'src/app/services/language.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  constructor(private _langService: LangService) {}

  lang$ = this._langService.currentLang$;

  teamSliderConfig = {
    autoplay: false,
    autoplaySpeed: 4000,
    dots: true,
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
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
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
}
