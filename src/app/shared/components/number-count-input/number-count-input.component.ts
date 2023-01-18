import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';

@Component({
  selector: 'app-number-count-input',
  templateUrl: './number-count-input.component.html',
  styleUrls: ['./number-count-input.component.css'],
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
export class NumberCountInputComponent {
  @Input() control: FormControl;
  @Input() label: string;
  @Input() hasStarSymbol: boolean = true; // to add star symbol next to the label
  @Input() stepValue: number = 5; // incremet number by value
  @Input() maxValue: number = 100; // incremet number by value
}
