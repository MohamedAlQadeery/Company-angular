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
  descriptionControl = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.categoryFormGroup = new FormGroup({
      name: this.nameControl,
      description: this.descriptionControl,
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
