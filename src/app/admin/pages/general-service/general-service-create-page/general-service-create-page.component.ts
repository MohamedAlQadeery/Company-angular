import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';
import { GeneralServiceService } from 'src/app/services/general-service.service';
import { StaticPageService } from 'src/app/services/static-page.service';

@Component({
  selector: 'app-general-service-create-page',
  templateUrl: './general-service-create-page.component.html',
  styleUrls: ['./general-service-create-page.component.css'],
})
export class GeneralServiceCreatePageComponent implements OnInit {
  constructor(
    private _generalService: GeneralServiceService,
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
  photo = new FormControl('');
  photoFile = new FormControl('');

  ngOnInit(): void {
    this.categoryFormGroup = new FormGroup({
      name: this.nameControl,
      nameAR: this.nameARControl,
      nameTR: this.nameTRControl,
      description: this.descriptionControl,
      descriptionAR: this.descriptionARControl,
      descriptionTR: this.descriptionTRControl,
      photo: this.photo,
      photoFile: this.photoFile,
    });
  }

  HandleOnSubmit() {
    console.log(this.categoryFormGroup.value);
    this._generalService
      .Create(this.categoryFormGroup.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this._toastr.success(
            `${res.name} has been created successfully !`,
            'General Service Created'
          );

          this._router.navigate(['/admin/GeneralService']);
        },
        error: (err) => {
          this._toastr.error(err);
          console.log(err);
        },
      });
  }
}
