import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
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
  ngOnInit(): void {
    this._activedRoute.paramMap
      .pipe(
        switchMap((para) => {
          let id = para.get('id')!;
          console.log(id);
          this.category$ = this._categoryService.GetCategoryById(+id);
          return this.category$;
        })
      )
      .subscribe();
  }
}
