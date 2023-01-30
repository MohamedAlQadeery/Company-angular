import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProviderServiceService } from 'src/app/services/provider-service.service';
import { IServiceResponse } from 'src/app/shared/interfaces/ServicesDtos';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-services-details',
  templateUrl: './services-details.component.html',
  styleUrls: ['./services-details.component.css'],
})
export class ServicesDetailsComponent {
  constructor(
    private _serviceService: ProviderServiceService,
    private _activeRoute: ActivatedRoute
  ) {}

  imagesUrl = `${environment.baseURL}/images/thumbs/big`;
  smallImagesUrl = `${environment.baseURL}/images/thumbs/small`;
  service$: Observable<IServiceResponse>;

  ngOnInit(): void {
    this._activeRoute.paramMap.subscribe((param) => {
      let id = param.get('id')!;
      this.service$ = this._serviceService.GetServiceById(+id);
    });
  }
}
