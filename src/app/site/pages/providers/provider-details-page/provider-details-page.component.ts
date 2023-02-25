import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { LangService } from 'src/app/services/language.service';
import { ProviderService } from 'src/app/services/provider.service';
import { UserService } from 'src/app/services/user.service';
import {
  IProviderResponse,
  IUserRespose,
} from 'src/app/shared/interfaces/UsersDto';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-provider-details-page',
  templateUrl: './provider-details-page.component.html',
  styleUrls: ['./provider-details-page.component.css'],
})
export class ProviderDetailsPageComponent {
  constructor(
    private _userService: UserService,
    private _activeRoute: ActivatedRoute,
    private _langService: LangService
  ) {}

  imagesUrl = `${environment.baseURL}/images`;
  smallImagesUrl = `${environment.baseURL}/images/thumbs/small`;
  provider$: Observable<IUserRespose>;
  lang$ = this._langService.currentLang$;

  ngOnInit(): void {
    this.provider$ = this._activeRoute.paramMap.pipe(
      switchMap((para) => {
        let email = para.get('email')!;
        return this._userService.GetUserData(email);
      }),
      tap((res) => console.log(res))
    );
  }
}
