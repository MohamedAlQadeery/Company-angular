import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';
import { StaticPageService } from 'src/app/services/static-page.service';

@Component({
  selector: 'app-static-page-create-page',
  templateUrl: './static-page-create-page.component.html',
  styleUrls: ['./static-page-create-page.component.css'],
})
export class StaticPageCreatePageComponent implements OnInit {
  constructor(
    private _categoryService: StaticPageService,
    private _router: Router,
    private _toastr: ToastrService
  ) {}

  categoryFormGroup: FormGroup;
  nameControl = new FormControl('', [Validators.required]);
  descriptionControl = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.categoryFormGroup = new FormGroup({
      pageName: this.nameControl,
      description: this.descriptionControl,
    });
  }

  HandleOnSubmit() {
    //console.log(this.categoryFormGroup.value);
    this._categoryService
      .Create(this.categoryFormGroup.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this._toastr.success(
            `${res.pageName} has been created successfully !`,
            'Static Page Created'
          );

          this._router.navigate(['/admin/StaticPage']);
        },
        error: (err) => {
          this._toastr.error(err);
        },
      });
  }
}
