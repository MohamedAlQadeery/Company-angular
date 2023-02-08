import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { Observable, switchMap, tap } from 'rxjs';
import { StaticPageService } from 'src/app/services/static-page.service';
import { StaticPage } from 'src/app/shared/interfaces/StaticPage';
import { __param } from 'tslib';

@Component({
  selector: 'app-static-page-edit-page',
  templateUrl: './static-page-edit-page.component.html',
  styleUrls: ['./static-page-edit-page.component.css'],
})
export class StaticPageEditPageComponent implements OnInit {
  constructor(
    private _staticPageService: StaticPageService,
    private _activedRoute: ActivatedRoute,
    private _router: Router,
    private _toastr: ToastrService
  ) {}
  page$: Observable<StaticPage>;
  pageId: number;

  pageFormGroup: FormGroup;
  nameControl = new FormControl('', [Validators.required]);
  descriptionControl = new FormControl('', [Validators.required]);

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
      pageName: this.nameControl,
      description: this.descriptionControl,
    });

    this._activedRoute.paramMap.subscribe((para) => {
      this.pageId = +para.get('id')!;
    });

    this.page$ = this._staticPageService.GetById(this.pageId).pipe(
      tap((cat) => {
        this.nameControl.setValue(cat.pageName);
        this.descriptionControl.setValue(cat.description);
      })
    );
  }

  HandleOnSubmit() {
    this.pageFormGroup.value.id = this.pageId;
    this._staticPageService
      .Update(this.pageFormGroup.value, this.pageId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this._toastr.success(
            `${res.pageName} has been updated successfully !`,
            'Static Page Updated'
          );

          this._router.navigate(['/admin/StaticPage']);
        },
        error: (err) => {
          this._toastr.error(err.message);
        },
      });
  }
}
