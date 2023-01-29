import { Component, Input } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { IUserRespose } from 'src/app/shared/interfaces/UsersDto';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-home-page',
  templateUrl: './profile-home-page.component.html',
  styleUrls: ['./profile-home-page.component.css'],
})
export class ProfileHomePageComponent {
  constructor(
    private _userService: UserService,
    private _authService: AuthService
  ) {}

  baseUrl = environment.baseURL;
  imageUrl = `${this.baseUrl}/images/thumbs/med`;
  userRole = this._authService.GetUserRole();
  userName: string;

  userData$ = this._userService.GetCurrentUserData().pipe(
    tap((res) => {
      console.log(res);
      this.userName =
        this.userRole == 'provider'
          ? res.companyName!
          : res.firstName + ' ' + res.middleName + ' ' + res.lastName;
    })
  );
}
