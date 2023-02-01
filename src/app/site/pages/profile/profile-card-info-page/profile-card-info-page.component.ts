import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-card-info-page',
  templateUrl: './profile-card-info-page.component.html',
  styleUrls: ['./profile-card-info-page.component.css'],
})
export class ProfileCardInfoPageComponent {
  constructor(private _userService: UserService) {}
  card$ = this._userService
    .GetCurrentUserCard()
    .pipe(tap((res) => console.log(res)));
}
