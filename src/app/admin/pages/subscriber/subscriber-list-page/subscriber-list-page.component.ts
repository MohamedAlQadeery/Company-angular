import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SubscriberService } from 'src/app/services/subscriber.service';

@Component({
  selector: 'app-subscriber-list-page',
  templateUrl: './subscriber-list-page.component.html',
  styleUrls: ['./subscriber-list-page.component.css']
})
export class SubscriberListPageComponent {
  constructor(
    private _subscriberService: SubscriberService,
    private _toastr: ToastrService
  ) {}
  subscribers$ = this._subscriberService.GetNotActiveSubscriber();

  HandleOnActivate(userEmail : string) {
    this._subscriberService.ActiveSubscriber(userEmail).subscribe({
      next: (res) => {
        console.log(res);
        this.subscribers$ = this._subscriberService.GetNotActiveSubscriber();
        this._toastr.success(
          'Subscriber has been Activated successfully',
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
