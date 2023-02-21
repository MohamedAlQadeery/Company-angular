import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProviderService } from 'src/app/services/provider.service';
import { Review } from 'src/app/shared/interfaces/review';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent {
  constructor(
    private _providerService: ProviderService,
    private _toastr: ToastrService
  ) {}
  providers$ = this._providerService.GetAllProviders();

  HandleOnReview(providerId: string, starts: string) {
    console.log(starts);
    if (starts.trim() == '' || +starts < 1 || +starts > 5) {
      this._toastr.warning('Plz Enter Valid Value 1-5');

      return;
    }
    let review: Review = {
      stars: +starts,
      providerId: providerId,
      id: 0,
      createdAt: null,
      updatedAt: null,
    };
    console.log(starts);

    this._providerService.ReviewProvider(review).subscribe({
      next: (res) => {
        console.log(res);
        this.providers$ = this._providerService.GetAllProviders();
        this._toastr.success(
          'Provider has been Reviewd successfully',
          'Reviewd Success'
        );
      },
      error: (err) => {
        console.log(err);
        this._toastr.error(err);
      },
    });
  }

  HandleOnUpdateReview(review: Review, starts: string) {
    if (starts.trim() == '' || +starts < 1 || +starts > 5) {
      this._toastr.warning('Plz Enter Valid Value 1-5');

      return;
    }

    review.stars = +starts;
    console.log(starts);

    this._providerService.UpdateProvider(review).subscribe({
      next: (res) => {
        console.log(res);
        this.providers$ = this._providerService.GetAllProviders();
        this._toastr.success(
          'Provider has been Reviewd Updated successfully',
          'Reviewd Updated Success'
        );
      },
      error: (err) => {
        console.log(err);
        this._toastr.error(err);
      },
    });
  }
}
