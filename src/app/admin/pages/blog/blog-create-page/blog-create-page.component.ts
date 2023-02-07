import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from 'src/app/services/blog.service';
import { CategoryService } from 'src/app/services/category.service';
import { StaticPageService } from 'src/app/services/static-page.service';

@Component({
  selector: 'app-blog-create-page',
  templateUrl: './blog-create-page.component.html',
  styleUrls: ['./blog-create-page.component.css'],
})
export class BlogCreatePageComponent implements OnInit {
  constructor(
    private _blogService: BlogService,
    private _router: Router,
    private _toastr: ToastrService
  ) {}

  categoryFormGroup: FormGroup;
  nameControl = new FormControl('', [Validators.required]);
  descriptionControl = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.categoryFormGroup = new FormGroup({
      title: this.nameControl,
      content: this.descriptionControl,
    });
  }

  HandleOnSubmit() {
    //console.log(this.categoryFormGroup.value);
    this._blogService
      .Create(this.categoryFormGroup.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this._toastr.success(
            `${res.title} has been created successfully !`,
            'Static Page Created'
          );

          this._router.navigate(['/admin/Blog']);
        },
        error: (err) => {
          this._toastr.error(err);
        },
      });
  }
}
