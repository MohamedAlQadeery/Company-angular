import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-create-page',
  templateUrl: './category-create-page.component.html',
  styleUrls: ['./category-create-page.component.css'],
})
export class CategoryCreatePageComponent implements OnInit {
  constructor(
    private _categoryService: CategoryService,
    private _router: Router,
    private _toastr: ToastrService
  ) {}

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
      nameAR: this.nameARControl,
      nameTR: this.nameTRControl,
      description: this.descriptionControl,
      descriptionAR: this.descriptionARControl,
      descriptionTR: this.descriptionTRControl,
    });
  }

  HandleOnSubmit() {
    //console.log(this.categoryFormGroup.value);
    this._categoryService
      .CreateCategory(this.categoryFormGroup.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this._toastr.success(
            `${res.name} has been created successfully !`,
            'Category Created'
          );

          this._router.navigate(['/admin/category']);
        },
        error: (err) => {
          this._toastr.error(err);
        },
      });
  }
}
