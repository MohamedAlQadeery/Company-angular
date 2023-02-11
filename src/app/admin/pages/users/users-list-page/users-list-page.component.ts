import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProviderService } from 'src/app/services/provider.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list-page',
  templateUrl: './users-list-page.component.html',
  styleUrls: ['./users-list-page.component.css'],
})
export class UsersListPageComponent {
  constructor(
    private _providerService: ProviderService,
    private _userService: UserService,
    private _toastr: ToastrService
  ) {}
  users$ = this._userService.GetAllDisabledNormalUsers();

  HandleOnActivate(userEmail: string) {
    this._providerService.ActiveProvider(userEmail).subscribe({
      next: (res) => {
        console.log(res);
        this.users$ = this._userService.GetAllDisabledNormalUsers();
        this._toastr.success(
          'User has been Activated successfully',
          'Activated Success'
        );
      },
      error: (err) => {
        console.log(err);
        this._toastr.error(err);
      },
    });
  }
}
