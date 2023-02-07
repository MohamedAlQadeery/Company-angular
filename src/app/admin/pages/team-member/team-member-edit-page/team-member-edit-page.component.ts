import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, switchMap, tap } from 'rxjs';
import { StaticPageService } from 'src/app/services/static-page.service';
import { TeamMemberService } from 'src/app/services/team-member.service';
import { StaticPage } from 'src/app/shared/interfaces/StaticPage';
import { TeamMember } from 'src/app/shared/interfaces/TeamMember';
import { __param } from 'tslib';

@Component({
  selector: 'app-team-member-edit-page',
  templateUrl: './team-member-edit-page.component.html',
  styleUrls: ['./team-member-edit-page.component.css'],
})
export class TeamMemberEditPageComponent implements OnInit {
  constructor(
    private _teamMemberService: TeamMemberService,
    private _activedRoute: ActivatedRoute,
    private _router: Router,
    private _toastr: ToastrService
  ) {}
  category$: Observable<TeamMember>;
  categoryId: number;

  categoryFormGroup: FormGroup;
  nameControl = new FormControl('', [Validators.required]);
  descriptionControl = new FormControl('', [Validators.required]);
  imageControl = new FormControl('', [Validators.required]);
  imageFileControl = new FormControl(null, [Validators.required]);

  ngOnInit(): void {
    this.categoryFormGroup = new FormGroup({
      id: new FormControl(null),
      name: this.nameControl,
      jopTitle: this.descriptionControl,
      image: this.imageControl,
      imageFile: this.imageFileControl,
    });

    this._activedRoute.paramMap.subscribe((para) => {
      this.categoryId = +para.get('id')!;
    });

    this.category$ = this._teamMemberService.GetById(this.categoryId).pipe(
      tap((cat) => {
        this.nameControl.setValue(cat.name);
        this.descriptionControl.setValue(cat.jopTitle);
        this.imageControl.setValue(cat.image);
      })
    );
  }

  HandleOnSubmit() {
    this.categoryFormGroup.value.id = this.categoryId;
    this._teamMemberService
      .Update(this.categoryFormGroup.value, this.categoryId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this._toastr.success(
            `${res.name} has been updated successfully !`,
            'Team Member Updated'
          );

          this._router.navigate(['/admin/TeamMember']);
        },
        error: (err) => {
          this._toastr.error(err.message);
        },
      });
  }

  // onFileChange(event: Event) {
  //   const target = event.target as HTMLInputElement;
  //   const files = target.files!;
  //   if (files.length > 0) {
  //     const file = files[0];
  //     console.log(file);
  //     this.categoryFormGroup.patchValue({
  //       imageFile: file,
  //     });
  //   }
  // }
}
