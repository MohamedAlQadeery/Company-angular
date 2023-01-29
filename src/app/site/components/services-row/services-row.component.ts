import { Component, Input } from '@angular/core';
import { IServiceResponse } from 'src/app/shared/interfaces/ServicesDtos';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-services-row',
  templateUrl: './services-row.component.html',
  styleUrls: ['./services-row.component.css'],
})
export class ServicesRowComponent {
  imagesUrl = `${environment.baseURL}/images/thumbs/small`;
  currentPage = 1;
  @Input() services: IServiceResponse[];
  @Input() itemsPerPage = 2;
}
