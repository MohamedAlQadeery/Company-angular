import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';
import { StaticPageService } from 'src/app/services/static-page.service';
import { TeamMemberService } from 'src/app/services/team-member.service';

@Component({
  selector: 'app-team-member-create-page',
  templateUrl: './team-member-create-page.component.html',
  styleUrls: ['./team-member-create-page.component.css'],
})
export class TeamMemberCreatePageComponent implements OnInit {
  constructor(
    private _teamMemberService: TeamMemberService,
    private _router: Router,
    private _toastr: ToastrService
  ) {}

  categoryFormGroup: FormGroup;
  nameControl = new FormControl('', [Validators.required]);
  descriptionControl = new FormControl('', [Validators.required]);
  imageFileControl = new FormControl(null, [Validators.required]);

  ngOnInit(): void {
    this.categoryFormGroup = new FormGroup({
      name: this.nameControl,
      jopTitle: this.descriptionControl,
      imageFile: this.imageFileControl,
    });
  }

  HandleOnSubmit() {
    //console.log(this.categoryFormGroup.value);
    this._teamMemberService
      .Create(this.categoryFormGroup.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this._toastr.success(
            `${res.name} has been created successfully !`,
            'Team Member Created'
          );

          this._router.navigate(['/admin/TeamMember']);
        },
        error: (err) => {
          this._toastr.error(err);
        },
      });
  }

}
