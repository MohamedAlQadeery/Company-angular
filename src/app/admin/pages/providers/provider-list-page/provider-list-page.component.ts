import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-provider-list-page',
  templateUrl: './provider-list-page.component.html',
  styleUrls: ['./provider-list-page.component.css'],
})
export class ProviderListPageComponent {
  constructor(
    private _providerService: ProviderService,
    private _toastr: ToastrService
  ) {}
  providers$ = this._providerService.GetNotActiveProvider();
  itemsPerPage = 8;
  currentPage = 1;
  HandleOnActivate(userEmail: string) {
    this._providerService.ActiveProvider(userEmail).subscribe({
      next: (res) => {
        console.log(res);
        this.providers$ = this._providerService.GetNotActiveProvider();
        this._toastr.success(
          'Provider has been Activated successfully',
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
