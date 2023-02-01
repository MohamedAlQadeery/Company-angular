import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProviderServiceService } from 'src/app/services/provider-service.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent {
  constructor(
    private _providerSService: ProviderServiceService,
    private _toastr: ToastrService
  ) {}
  providerSs$ = this._providerSService.GetAllNotActiveServices();

  HandleOnActivate(id: number) {
    this._providerSService.ApproveService(id).subscribe({
      next: (res) => {
        console.log(res);
        this.providerSs$ = this._providerSService.GetAllNotActiveServices();
        this._toastr.success(
          'Service has been Activated successfully',
          'Activated Success'
        );
      },
      error: (err) => {
        console.log(err);
        this._toastr.error(err);
      },
    });
  }
}
