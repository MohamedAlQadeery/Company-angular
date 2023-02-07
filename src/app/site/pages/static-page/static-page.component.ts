import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StaticPageService } from 'src/app/services/static-page.service';

@Component({
  selector: 'app-static-page',
  templateUrl: './static-page.component.html',
  styleUrls: ['./static-page.component.css'],
})
export class StaticPageComponent implements OnInit {
  constructor(
    private _staticPageService: StaticPageService,
    private _route: ActivatedRoute
  ) {}

  pageName: string;

  ngOnInit(): void {
    this._route.paramMap.subscribe((para) => {
      this.pageName = para.get('pageName')!;
      console.log(this.pageName);
    });
  }
}
