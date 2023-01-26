import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this._authService.GetToken();
    const baseUrl = environment.baseURL;
    if (token && request.url.includes(baseUrl)) {
      request = request.clone({
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      });
    }

    return next.handle(request);
  }
}
