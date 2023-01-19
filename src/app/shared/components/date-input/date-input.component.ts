import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TUI_DATE_FORMAT, TUI_DATE_SEPARATOR } from '@taiga-ui/cdk';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css'],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        //for validation messages
        required: 'required-input-validation',
      },
    },
    { provide: TUI_DATE_FORMAT, useValue: `YMD` },
    { provide: TUI_DATE_SEPARATOR, useValue: `/` },
  ],
})
export class DateInputComponent {
  @Input() control: FormControl;
  @Input() label: string;
  @Input() hasStarSymbol: boolean = true; // to add star symbol next to the label
}
