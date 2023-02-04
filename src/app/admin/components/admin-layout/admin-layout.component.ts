import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
})
export class AdminLayoutComponent {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _toastr: ToastrService
  ) {
  }
  HandleLogOut() {
    this._authService.Logout();
    this._router.navigate(['/']);
    this._toastr.success('تم تسجيل الخروج بنجاح', 'تسجيل الخروج', {
      positionClass: 'toast-top-center',
    });
  }
}
