import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ContactusService } from 'src/app/services/contactus.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent {
  constructor(
    private _contactUsService: ContactusService,
    private _toastr: ToastrService
  ) {}
  categories$ = this._contactUsService.GetAll();

  HandleOnDelete(id: number) {
    this._contactUsService.Delete(id).subscribe({
      next: (res) => {
        console.log(res);
        this.categories$ = this._contactUsService.GetAll();
        this._toastr.success(
          'deleted successfully',
          'Delete Success'
        );
      },
      error: (err) => {
        console.log(err);
        this._toastr.error(err);
      },
    });
  }
}
