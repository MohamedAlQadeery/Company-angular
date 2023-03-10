import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, switchMap, tap } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import {
  ICategoryResponse,
  IUpdateCategoryRequest,
} from 'src/app/shared/interfaces/CategoryDtos';
import { __param } from 'tslib';

@Component({
  selector: 'app-category-edit-page',
  templateUrl: './category-edit-page.component.html',
  styleUrls: ['./category-edit-page.component.css'],
})
export class CategoryEditPageComponent implements OnInit {
  constructor(
    private _categoryService: CategoryService,
    private _activedRoute: ActivatedRoute,
    private _router: Router,
    private _toastr: ToastrService
  ) {}
  category$: Observable<ICategoryResponse>;
  categoryId: number;

  categoryFormGroup: FormGroup;
  nameControl = new FormControl('', [Validators.required]);
  nameARControl = new FormControl('', [Validators.required]);
  nameTRControl = new FormControl('', [Validators.required]);
  descriptionControl = new FormControl('', [Validators.required]);
  descriptionARControl = new FormControl('', [Validators.required]);
  descriptionTRControl = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.categoryFormGroup = new FormGroup({
      name: this.nameControl,
      nameAr: this.nameARControl,
      nameTR: this.nameTRControl,
      description: this.descriptionControl,
      descriptionAR: this.descriptionARControl,
      descriptionTR: this.descriptionTRControl,
    });

    this._activedRoute.paramMap.subscribe((para) => {
      this.categoryId = +para.get('id')!;
    });

    this.category$ = this._categoryService
      .GetCategoryById(this.categoryId)
      .pipe(
        tap((cat) => {
          this.nameControl.setValue(cat.name);
          this.descriptionControl.setValue(cat.description);
          this.nameARControl.setValue(cat.nameAr);
          this.descriptionARControl.setValue(cat.descriptionAR);
          this.nameTRControl.setValue(cat.nameTR);
          this.descriptionTRControl.setValue(cat.descriptionTR);
        })
      );
  }

  HandleOnSubmit() {
    const updateRequest: IUpdateCategoryRequest = this.categoryFormGroup.value;
    updateRequest.id = this.categoryId;
    this._categoryService
      .UpdateCategory(updateRequest, this.categoryId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this._toastr.success(
            `${res.name} has been updated successfully !`,
            'Category Updated'
          );

          this._router.navigate(['/admin/category']);
        },
        error: (err) => {
          this._toastr.error(err);
        },
      });
  }
}
