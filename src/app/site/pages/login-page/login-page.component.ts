import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _toastr: ToastrService
  ) {}
  //#region FormGroup and formControls
  loginFormGroup: FormGroup;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [Validators.required]);
  //#endregion

  ngOnInit(): void {
    if (this._authService.isAuthenticated()) {
      this._router.navigate(['/']);
    }
    this.loginFormGroup = new FormGroup({
      email: this.emailFormControl,
      password: this.passwordFormControl,
    });
  }

  HandleOnLogin() {
    this._authService.LoginWithEmail(this.loginFormGroup.value).subscribe({
      next: (res) => {
        this._authService.SaveToken(res);
        const email = this._authService.GetFieldFromJWT('Email');
        this._toastr.success(`اهلا بك ${email}`, 'تم تسجيل الدخول بنجاح', {
          positionClass: 'toast-top-center',
        });

        if (this._authService.isUserAdmin()) {
          this._router.navigate(['/admin']);
          return;
        }
        var returnUrl = this._activeRoute.snapshot.queryParams['returnUrl'];
        this._router.navigate([returnUrl ?? '/']);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this._toastr.error(err.error.message, 'خطأ في تسجيل الدخول');
      },
    });
  }
}
