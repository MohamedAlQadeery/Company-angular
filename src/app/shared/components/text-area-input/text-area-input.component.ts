import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';

@Component({
  selector: 'app-text-area-input',
  templateUrl: './text-area-input.component.html',
  styleUrls: ['./text-area-input.component.css'],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        //for validation messages
        required: 'required-input-validation',
      },
    },
  ],
})
export class TextAreaInputComponent {
  @Input() control: FormControl;
  @Input() label: string;
  @Input() hasStarSymbol: boolean = true; // to add star symbol next to the label
}
