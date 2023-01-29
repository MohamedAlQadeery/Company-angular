import { Component } from '@angular/core';
import { LangService } from 'src/app/services/language.service';
import { ProviderServiceService } from 'src/app/services/provider-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-services-list-page',
  templateUrl: './profile-services-list-page.component.html',
  styleUrls: ['./profile-services-list-page.component.css'],
})
export class ProfileServicesListPageComponent {
  constructor(
    private _langService: LangService,
    private _servicesServices: ProviderServiceService,
    private _userService: UserService
  ) {}
  lang$ = this._langService.currentLang$;
  services$ = this._servicesServices.GetCurrentProviderServices();
}
