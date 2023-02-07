import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from 'src/app/services/article.service';
import { BlogService } from 'src/app/services/blog.service';
import { CategoryService } from 'src/app/services/category.service';
import { StaticPageService } from 'src/app/services/static-page.service';

@Component({
  selector: 'app-article-create-page',
  templateUrl: './article-create-page.component.html',
  styleUrls: ['./article-create-page.component.css'],
})
export class ArticleCreatePageComponent implements OnInit {
  constructor(
    private _articleService: ArticleService,
    private _blogService: BlogService,
    private _router: Router,
    private _toastr: ToastrService
  ) {}
  blogs: { id: number; name: string }[] = [];
  categoryFormGroup: FormGroup;
  nameControl = new FormControl('', [Validators.required]);
  descriptionControl = new FormControl('', [Validators.required]);
  blogIdControl = new FormControl(null, [Validators.required]);
  ngOnInit(): void {
    this._blogService.GetAll().subscribe({
      next: (res) => {
        res.map(({ id, title }) => {
          this.blogs.push({ id: id, name: title });
        });
      },
    });

    this.categoryFormGroup = new FormGroup({
      title: this.nameControl,
      content: this.descriptionControl,
      blogId: this.blogIdControl,
    });
  }

  HandleOnSubmit() {
    //console.log(this.categoryFormGroup.value);
    this._articleService.Create(this.categoryFormGroup.value).subscribe({
      next: (res) => {
        console.log(res);
        this._toastr.success(
          `${res.title} has been created successfully !`,
          'Static Page Created'
        );

        this._router.navigate(['/admin/Article']);
      },
      error: (err) => {
        this._toastr.error(err);
      },
    });
  }
}
