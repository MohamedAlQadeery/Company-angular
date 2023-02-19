import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
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
  categoryFormGroup: FormGroup;
  nameControl = new FormControl('', [Validators.required]);
  nameTRControl = new FormControl('', [Validators.required]);
  nameARControl = new FormControl('', [Validators.required]);
  descriptionControl = new FormControl('', [Validators.required]);
  descriptionARControl = new FormControl('', [Validators.required]);
  descriptionTRControl = new FormControl('', [Validators.required]);
  blogIdControl = new FormControl(null, [Validators.required]);

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    width: 'auto',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['bold']],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };

  blogs$: Observable<{ id: number | string; name: string }[]>;

  ngOnInit(): void {
    this.blogs$ = this._blogService.GetAll().pipe(
      map((res) => {
        return res.map((c) => ({ id: c.id, name: c.title }));
      })
    );

    this.categoryFormGroup = new FormGroup({
      title: this.nameControl,
      titleAR: this.nameARControl,
      titleTR: this.nameTRControl,
      content: this.descriptionControl,
      contentAR: this.descriptionARControl,
      contentTR: this.descriptionTRControl,
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
