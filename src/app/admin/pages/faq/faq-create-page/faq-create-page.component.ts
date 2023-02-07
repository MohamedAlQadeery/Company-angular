import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';
import { FaqService } from 'src/app/services/faq.service';
import { StaticPageService } from 'src/app/services/static-page.service';

@Component({
  selector: 'app-faq-create-page',
  templateUrl: './faq-create-page.component.html',
  styleUrls: ['./faq-create-page.component.css'],
})
export class FaqCreatePageComponent implements OnInit {
  constructor(
    private _faqService: FaqService,
    private _router: Router,
    private _toastr: ToastrService
  ) {}

  categoryFormGroup: FormGroup;
  qENControl = new FormControl('', [Validators.required]);
  aENControl = new FormControl('', [Validators.required]);
  qARControl = new FormControl('', [Validators.required]);
  aARControl = new FormControl('', [Validators.required]);
  qTRControl = new FormControl('', [Validators.required]);
  aTRControl = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.categoryFormGroup = new FormGroup({
      questionEnglish: this.qENControl,
      answerEnglish: this.aENControl,
      questionArabic: this.qARControl,
      answerArabic: this.aARControl,
      questionTurkish: this.qTRControl,
      answerTurkish: this.aTRControl,
    });
  }

  HandleOnSubmit() {
    //console.log(this.categoryFormGroup.value);
    this._faqService
      .Create(this.categoryFormGroup.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this._toastr.success(
            `has been created successfully !`,
            'Faq Created'
          );

          this._router.navigate(['/admin/Faq']);
        },
        error: (err) => {
          this._toastr.error(err);
        },
      });
  }
}
