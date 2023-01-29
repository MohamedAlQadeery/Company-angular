import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { ProviderServiceService } from 'src/app/services/provider-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.css'],
})
export class ServicesPageComponent {
  constructor(private _servicesServices: ProviderServiceService) {}
  imagesUrl = `${environment.baseURL}/images/thumbs/small`;

  services$ = this._servicesServices.GetAllServices().pipe(
    tap((res) => {
      console.log(res);
    })
  );
}
