import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private _loadingService: LoadingService) {}
  baseUrl = environment.baseURL;

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!request.url.includes(this.baseUrl)) {
      return next.handle(request);
    }
    this._loadingService.EmitLoader(true);

    return next.handle(request).pipe(
      finalize(() => {
        this._loadingService.EmitLoader(false);
      })
    );
  }
}
