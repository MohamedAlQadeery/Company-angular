import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TuiFileLike } from '@taiga-ui/kit';
import { Observable, Subject, tap } from 'rxjs';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css'],
})
export class FileInputComponent implements OnInit {
  @Input() control: FormControl;
  @Input() textlabel: string;
  @Input() linklabel: string;
  @Input() accept: string; //format accepts

  readonly rejectedFiles$ = new Subject<TuiFileLike | null>();
  loadedFiles$: Observable<File>;
  ngOnInit(): void {
    this.loadedFiles$ = this.control.valueChanges.pipe(
      tap((file) => {
        console.log(file);
      })
    );
  }

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
