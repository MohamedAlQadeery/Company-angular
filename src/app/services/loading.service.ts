import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor() {}
  private showLoader = new BehaviorSubject(false);
  public loader$ = this.showLoader.asObservable();

  public EmitLoader(val: boolean) {
    this.showLoader?.next(val);
  }
}
