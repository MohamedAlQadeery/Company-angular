import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiFileLike } from '@taiga-ui/kit';
import { Subject, tap } from 'rxjs';

@Component({
  selector: 'app-provider-signup',
  templateUrl: './provider-signup.component.html',
  styleUrls: ['./provider-signup.component.css'],
})
export class ProviderSignupComponent implements OnInit {
  // for sample select options only
  fakeData = [
    `Luke Skywalker`,
    `Leia Organa Solo`,
    `Darth Vader`,
    `Han Solo`,
    `Obi-Wan Kenobi`,
    `Yoda`,
  ];

  //#region signup form
  signupFormGroup: FormGroup;
  companyNameControl = new FormControl('', [Validators.required]);
  //#endregion

  ngOnInit(): void {
    this.signupFormGroup = new FormGroup({
      companyName: this.companyNameControl,
    });
  }
  readonly control = new FormControl();

  readonly rejectedFiles$ = new Subject<TuiFileLike | null>();
  readonly loadedFiles$ = this.control.valueChanges.pipe(
    tap((file) => {
      console.log(file);
    })
  );

  onReject(file: TuiFileLike | readonly TuiFileLike[]): void {
    this.rejectedFiles$.next(file as TuiFileLike);
  }

  removeFile(): void {
    this.control.setValue(null);
  }

  clearRejected(): void {
    this.removeFile();
    this.rejectedFiles$.next(null);
  }
}
