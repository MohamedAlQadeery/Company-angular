import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, switchMap, tap } from 'rxjs';
import { BlogService } from 'src/app/services/blog.service';
import { StaticPageService } from 'src/app/services/static-page.service';
import { Blog } from 'src/app/shared/interfaces/BlogDTO';
import { StaticPage } from 'src/app/shared/interfaces/StaticPage';
import { __param } from 'tslib';

@Component({
  selector: 'app-blog-edit-page',
  templateUrl: './blog-edit-page.component.html',
  styleUrls: ['./blog-edit-page.component.css'],
})
export class BlogEditPageComponent implements OnInit {
  constructor(
    private _blogService: BlogService,
    private _activedRoute: ActivatedRoute,
    private _router: Router,
    private _toastr: ToastrService
  ) {}
  category$: Observable<Blog>;
  categoryId: number;

  categoryFormGroup: FormGroup;
  nameControl = new FormControl('', [Validators.required]);
  nameARControl = new FormControl('', [Validators.required]);
  nameTRControl = new FormControl('', [Validators.required]);
  descriptionControl = new FormControl('', [Validators.required]);
  descriptionTRControl = new FormControl('', [Validators.required]);
  descriptionARControl = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.categoryFormGroup = new FormGroup({
      id: new FormControl(null),
      title: this.nameControl,
      titleTR: this.nameTRControl,
      titleAR: this.nameARControl,
      content: this.descriptionControl,
      contentAR: this.descriptionARControl,
      contentTR: this.descriptionTRControl,
    });

    this._activedRoute.paramMap.subscribe((para) => {
      this.categoryId = +para.get('id')!;
    });

    this.category$ = this._blogService
      .GetById(this.categoryId)
      .pipe(
        tap((cat) => {
          this.nameControl.setValue(cat.title);
          this.nameTRControl.setValue(cat.titleTR);
          this.nameARControl.setValue(cat.titleAR);
          this.descriptionControl.setValue(cat.content);
          this.descriptionTRControl.setValue(cat.contentTR);
          this.descriptionARControl.setValue(cat.contentAR);
        })
      );
  }

  HandleOnSubmit() {
    this.categoryFormGroup.value.id = this.categoryId;
    this._blogService
      .Update(this.categoryFormGroup.value, this.categoryId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this._toastr.success(
            `${res.title} has been updated successfully !`,
            'Blog Updated'
          );

          this._router.navigate(['/admin/Blog']);
        },
        error: (err) => {
          this._toastr.error(err.message);
        },
      });
  }
}
