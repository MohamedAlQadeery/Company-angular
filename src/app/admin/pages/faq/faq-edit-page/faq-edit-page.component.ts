import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, switchMap, tap } from 'rxjs';
import { FaqService } from 'src/app/services/faq.service';
import { StaticPageService } from 'src/app/services/static-page.service';
import { Faq } from 'src/app/shared/interfaces/FaqDTO';
import { StaticPage } from 'src/app/shared/interfaces/StaticPage';
import { __param } from 'tslib';

@Component({
  selector: 'app-faq-edit-page',
  templateUrl: './faq-edit-page.component.html',
  styleUrls: ['./faq-edit-page.component.css'],
})
export class FaqEditPageComponent implements OnInit {
  constructor(
    private _FaqService: FaqService,
    private _activedRoute: ActivatedRoute,
    private _router: Router,
    private _toastr: ToastrService
  ) {}
  category$: Observable<Faq>;
  categoryId: number;

  categoryFormGroup: FormGroup;
  qENControl = new FormControl('', [Validators.required]);
  aENControl = new FormControl('', [Validators.required]);
  qARControl = new FormControl('', [Validators.required]);
  aARControl = new FormControl('', [Validators.required]);
  qTRControl = new FormControl('', [Validators.required]);
  aTRControl = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.categoryFormGroup = new FormGroup({
      id: new FormControl(null),
      questionEnglish: this.qENControl,
      answerEnglish: this.aENControl,
      questionArabic: this.qARControl,
      answerArabic: this.aARControl,
      questionTurkish: this.qTRControl,
      answerTurkish: this.aTRControl,
    });

    this._activedRoute.paramMap.subscribe((para) => {
      this.categoryId = +para.get('id')!;
    });

    this.category$ = this._FaqService
      .GetById(this.categoryId)
      .pipe(
        tap((cat) => {
          this.qENControl.setValue(cat.questionEnglish);
          this.aENControl.setValue(cat.answerEnglish);
          this.qARControl.setValue(cat.answerArabic);
          this.aARControl.setValue(cat.answerArabic);
          this.qTRControl.setValue(cat.questionTurkish);
          this.aTRControl.setValue(cat.answerTurkish);
        })
      );
  }

  HandleOnSubmit() {
    this.categoryFormGroup.value.id = this.categoryId;
    this._FaqService
      .Update(this.categoryFormGroup.value, this.categoryId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this._toastr.success(
            `has been updated successfully !`,
            'Faq Updated'
          );

          this._router.navigate(['/admin/Faq']);
        },
        error: (err) => {
          this._toastr.error(err.message);
        },
      });
  }
}
