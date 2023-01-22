import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { ICategoryResponse } from 'src/app/shared/interfaces/CategoryDtos';

@Component({
  selector: 'app-category-list-page',
  templateUrl: './category-list-page.component.html',
  styleUrls: ['./category-list-page.component.css'],
})
export class CategoryListPageComponent {
  constructor(private _categoryService: CategoryService) {}
  categories$ = this._categoryService.GetAllCategories();
}
