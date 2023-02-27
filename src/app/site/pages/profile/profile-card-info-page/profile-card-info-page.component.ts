import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-card-info-page',
  templateUrl: './profile-card-info-page.component.html',
  styleUrls: ['./profile-card-info-page.component.css'],
})
export class ProfileCardInfoPageComponent {
  constructor(private _userService: UserService) {}
  cardQrCode: string;
  card$ = this._userService.GetCurrentUserCard().pipe(
    tap((res) => {
      this.cardQrCode =
        window.origin + `/card/${res.cardNumber?.replaceAll('-', '')}`;
    })
  );
}
