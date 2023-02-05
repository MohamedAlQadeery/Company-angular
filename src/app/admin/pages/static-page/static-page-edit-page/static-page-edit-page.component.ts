import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  category$: Observable<StaticPage>;
  categoryId: number;

  categoryFormGroup: FormGroup;
  nameControl = new FormControl('', [Validators.required]);
  descriptionControl = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.categoryFormGroup = new FormGroup({
      id: new FormControl(null),
      pageName: this.nameControl,
      description: this.descriptionControl,
    });

    this._activedRoute.paramMap.subscribe((para) => {
      this.categoryId = +para.get('id')!;
    });

    this.category$ = this._staticPageService
      .GetById(this.categoryId)
      .pipe(
        tap((cat) => {
          this.nameControl.setValue(cat.pageName);
          this.descriptionControl.setValue(cat.description);
        })
      );
  }

  HandleOnSubmit() {
    this.categoryFormGroup.value.id = this.categoryId;
    this._staticPageService
      .Update(this.categoryFormGroup.value, this.categoryId)
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
