import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { Observable, switchMap, tap } from 'rxjs';
import { StaticPageService } from 'src/app/services/static-page.service';
import { WebSiteInfoService } from 'src/app/services/webSiteInfo.service';
import { StaticPage } from 'src/app/shared/interfaces/StaticPage';
import { WebSiteInfo } from 'src/app/shared/interfaces/WebSiteInfo';
import { __param } from 'tslib';

@Component({
  selector: 'app-webSiteInfo-page-edit-page',
  templateUrl: './webSiteInfo-page-edit-page.component.html',
  styleUrls: ['./webSiteInfo-page-edit-page.component.css'],
})
export class WebSiteInfoPageEditPageComponent implements OnInit {
  constructor(
    private _webSIteInfoService: WebSiteInfoService,
    private _activedRoute: ActivatedRoute,
    private _router: Router,
    private _toastr: ToastrService
  ) {}
  page$: Observable<WebSiteInfo>;
  pageId: number;

  pageFormGroup: FormGroup;
  nameControl = new FormControl('', [Validators.required]);
  nameARControl = new FormControl('', [Validators.required]);
  nameTRControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required]);
  aboutUsControl = new FormControl('', [Validators.required]);
  aboutUsARControl = new FormControl('', [Validators.required]);
  aboutUsTRControl = new FormControl('', [Validators.required]);
  phoneNumberControl = new FormControl('', [Validators.required]);
  workingTimeStartControl = new FormControl('', [Validators.required]);
  workingTimeEndControl = new FormControl('', [Validators.required]);
  expYearsControl = new FormControl(0, [Validators.required]);

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    width: 'auto',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['bold']],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };

  ngOnInit(): void {
    this.pageFormGroup = new FormGroup({
      id: new FormControl(null),
      name: this.nameControl,
      nameAR: this.nameARControl,
      nameTR: this.nameTRControl,
      email: this.emailControl,
      aboutUs: this.aboutUsControl,
      aboutUsAR: this.aboutUsARControl,
      aboutUsTR: this.aboutUsTRControl,
      phoneNumber: this.phoneNumberControl,
      workingTimeStart : this.workingTimeStartControl,
      workingTimeEnd : this.workingTimeEndControl,
      expYears : this.expYearsControl,
    });

    this._activedRoute.paramMap.subscribe((para) => {
      this.pageId = +para.get('id')!;
    });

    this.page$ = this._webSIteInfoService.GetById(this.pageId).pipe(
      tap((cat) => {
        this.emailControl.setValue(cat.email);
        this.nameControl.setValue(cat.name);
        this.nameARControl.setValue(cat.nameAR);
        this.nameTRControl.setValue(cat.nameTR);
        this.aboutUsControl.setValue(cat.aboutUs);
        this.aboutUsARControl.setValue(cat.aboutUsAR);
        this.aboutUsTRControl.setValue(cat.aboutUsTR);
        this.phoneNumberControl.setValue(cat.phoneNumber);
        this.workingTimeStartControl.setValue(cat.workingTimeStart.toString());
        this.workingTimeEndControl.setValue(cat.workingTimeEnd.toString());
        this.expYearsControl.setValue(cat.expYears);
      })
    );
  }

  HandleOnSubmit() {
    this.pageFormGroup.value.id = this.pageId;
    console.log(this.pageFormGroup.value);
    this._webSIteInfoService
      .Update(this.pageFormGroup.value, this.pageId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this._toastr.success(
            `${res.email} has been updated successfully !`,
            'Info Updated'
          );

          this._router.navigate(['/admin/WebSiteInfo']);
        },
        error: (err) => {
          this._toastr.error(err.message);
          console.log(err);
        },
      });
  }
}
