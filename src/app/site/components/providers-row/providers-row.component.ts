import { Component, Input } from '@angular/core';
import { IServiceResponse } from 'src/app/shared/interfaces/ServicesDtos';
import { IProviderResponse } from 'src/app/shared/interfaces/UsersDto';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-providers-row',
  templateUrl: './providers-row.component.html',
  styleUrls: ['./providers-row.component.css'],
})
export class ProvidersRowComponent {
  imagesUrl = `${environment.baseURL}/images/thumbs/small`;
  currentPage = 1;
  @Input() providers: IProviderResponse[];
  @Input() itemsPerPage = 6;
  @Input() isRtl = false;
}
