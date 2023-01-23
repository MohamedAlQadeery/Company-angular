import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { ICategoryResponse } from 'src/app/shared/interfaces/CategoryDtos';
import { __param } from 'tslib';

@Component({
  selector: 'app-category-edit-page',
  templateUrl: './category-edit-page.component.html',
  styleUrls: ['./category-edit-page.component.css'],
})
export class CategoryEditPageComponent implements OnInit {
  constructor(
    private _categoryService: CategoryService,
    private _activedRoute: ActivatedRoute
  ) {}
  category$: Observable<ICategoryResponse>;
  categoryId: number;

  categoryFormGroup: FormGroup;
  nameControl = new FormControl('', [Validators.required]);
  descriptionControl = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.categoryFormGroup = new FormGroup({
      name: this.nameControl,
      description: this.descriptionControl,
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
        })
      );
  }

  HandleOnSubmit() {
    console.log(this.categoryFormGroup.value);
  }
}
