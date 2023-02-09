import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, switchMap, tap } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';
import { BlogService } from 'src/app/services/blog.service';
import { StaticPageService } from 'src/app/services/static-page.service';
import { Article } from 'src/app/shared/interfaces/ArticleDTO';
import { StaticPage } from 'src/app/shared/interfaces/StaticPage';
import { __param } from 'tslib';

@Component({
  selector: 'app-article-edit-page',
  templateUrl: './article-edit-page.component.html',
  styleUrls: ['./article-edit-page.component.css'],
})
export class ArticleEditPageComponent implements OnInit {
  constructor(
    private _articleService: ArticleService,
    private _blogService: BlogService,
    private _activedRoute: ActivatedRoute,
    private _router: Router,
    private _toastr: ToastrService
  ) {}
  category$: Observable<Article>;
  categoryId: number;

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
  categoryFormGroup: FormGroup;
  nameControl = new FormControl('', [Validators.required]);
  descriptionControl = new FormControl('', [Validators.required]);
  blogIdControl = new FormControl(0, [Validators.required]);
  ngOnInit(): void {
    this.categoryFormGroup = new FormGroup({
      id: new FormControl(null),
      title: this.nameControl,
      content: this.descriptionControl,
      blogId: this.blogIdControl,
    });

    this._activedRoute.paramMap.subscribe((para) => {
      this.categoryId = +para.get('id')!;
    });

    this.blogs$ = this._blogService.GetAll().pipe(
      map((res) => {
        return res.map((c) => ({ id: c.id, name: c.title }));
      })
    );

    this.category$ = this._articleService.GetById(this.categoryId).pipe(
      tap((cat) => {
        console.log(cat);
        this.nameControl.setValue(cat.title);
        this.descriptionControl.setValue(cat.content);
        this.blogIdControl.setValue(cat.blogId);
      })
    );
  }

  HandleOnSubmit() {
    this.categoryFormGroup.value.id = this.categoryId;
    this._articleService
      .Update(this.categoryFormGroup.value, this.categoryId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this._toastr.success(
            `${res.title} has been updated successfully !`,
            'Article Updated'
          );

          this._router.navigate(['/admin/Article']);
        },
        error: (err) => {
          this._toastr.error(err.message);
        },
      });
  }
}
