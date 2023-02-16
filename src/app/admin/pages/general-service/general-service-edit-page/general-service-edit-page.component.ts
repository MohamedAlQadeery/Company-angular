import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, switchMap, tap } from 'rxjs';
import { GeneralServiceService } from 'src/app/services/general-service.service';
import { StaticPageService } from 'src/app/services/static-page.service';
import { GeneralService } from 'src/app/shared/interfaces/GeneralServiceDtos';
import { StaticPage } from 'src/app/shared/interfaces/StaticPage';
import { __param } from 'tslib';

@Component({
  selector: 'app-general-service-edit-page',
  templateUrl: './general-service-edit-page.component.html',
  styleUrls: ['./general-service-edit-page.component.css'],
})
export class GeneralServiceEditPageComponent implements OnInit {
  constructor(
    private _generalService: GeneralServiceService,
    private _activedRoute: ActivatedRoute,
    private _router: Router,
    private _toastr: ToastrService
  ) {}
  category$: Observable<GeneralService>;
  categoryId: number;

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
      id: new FormControl(null),
      name: this.nameControl,
      nameAR: this.nameARControl,
      nameTR: this.nameTRControl,
      description: this.descriptionControl,
      descriptionAR: this.descriptionARControl,
      descriptionTR: this.descriptionTRControl,
      photo: this.photo,
      photoFile: this.photoFile,

    });

    this._activedRoute.paramMap.subscribe((para) => {
      this.categoryId = +para.get('id')!;
    });

    this.category$ = this._generalService
      .GetById(this.categoryId)
      .pipe(
        tap((cat) => {
          this.nameControl.setValue(cat.name);
          this.descriptionControl.setValue(cat.description);
          this.nameARControl.setValue(cat.nameAR);
          this.descriptionARControl.setValue(cat.descriptionAR);
          this.nameTRControl.setValue(cat.nameTR);
          this.descriptionTRControl.setValue(cat.descriptionTR);
          this.photo.setValue(cat.photo);
        })
      );
  }

  HandleOnSubmit() {
    this.categoryFormGroup.value.id = this.categoryId;
    console.log(this.categoryFormGroup.value);
    let {name} = this.categoryFormGroup.value.name;
    this._generalService
      .Update(this.categoryFormGroup.value, this.categoryId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this._toastr.success(
            `${name} has been updated successfully !`,
            'Gneral Service Updated'
          );

          this._router.navigate(['/admin/GeneralService']);
        },
        error: (err) => {
          this._toastr.error(err.message);
          console.log(err);
        },
      });
  }
}
