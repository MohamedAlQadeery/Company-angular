import { Component, Inject } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { ToastrService } from 'ngx-toastr';
import { ContactusService } from 'src/app/services/contactus.service';
import { Contact } from 'src/app/shared/interfaces/ContactDTO';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css'],
})
export class ListPageComponent {
  constructor(
    private _contactUsService: ContactusService,
    private _toastr: ToastrService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService
  ) {}
  messages$ = this._contactUsService.GetAll();

  HandleOnDelete(id: number) {
    this._contactUsService.Delete(id).subscribe({
      next: (res) => {
        console.log(res);
        this.messages$ = this._contactUsService.GetAll();
        this._toastr.success('deleted successfully', 'Delete Success');
      },
      error: (err) => {
        console.log(err);
        this._toastr.error(err);
      },
    });
  }

  showDialog(message: Contact): void {
    this.dialogService
      .open(message.message, { label: message.name, size: 'm' })
      .subscribe();
  }
}
