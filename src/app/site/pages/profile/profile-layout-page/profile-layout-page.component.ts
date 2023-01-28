import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { IUserRespose } from 'src/app/shared/interfaces/UsersDto';

@Component({
  selector: 'app-profile-layout-page',
  templateUrl: './profile-layout-page.component.html',
  styleUrls: ['./profile-layout-page.component.css'],
})
export class ProfileLayoutPageComponent {
  constructor(private _authService: AuthService) {}

  userRole = this._authService.GetUserRole();
}
