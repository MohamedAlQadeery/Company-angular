import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  constructor(
    private _userService: UserService,
    private _toastr: ToastrService
  ) {}
  users$ = this._userService.GetAllUsers();
  itemsPerPage = 8;
  currentPage = 1;

  HandleOnDelete(userEmail: string) {
    this._userService.DeleteUser(userEmail).subscribe({
      next: (res) => {
        console.log(res);
        this.users$ = this._userService.GetAllUsers();
        this._toastr.success(
          'User has been deleted successfully',
          'Delete Success'
        );
      },
      error: (err) => {
        console.log(err);
        this._toastr.error(err);
      },
    });
  }

  HandleOnDisactive(userEmail: string) {
    this._userService.DisactiveUser(userEmail).subscribe({
      next: (res) => {
        console.log(res);
        this.users$ = this._userService.GetAllUsers();
        this._toastr.success(
          'User has been Disactived successfully',
          'Disactive Success'
        );
      },
      error: (err) => {
        console.log(err);
        this._toastr.error(err);
      },
    });
  }

  HandleOnActivate(userEmail: string) {
    this._userService.ActivateUser(userEmail).subscribe({
      next: (res) => {
        console.log(res);
        this.users$ = this._userService.GetAllUsers();
        this._toastr.success(
          'User has been Activated successfully',
          'Activate Success'
        );
      },
      error: (err) => {
        console.log(err);
        this._toastr.error(err);
      },
    });
  }
}
