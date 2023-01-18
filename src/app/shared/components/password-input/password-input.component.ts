import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.css'],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        //for validation messages
        required: 'required-input-validation',
        mustMatch: 'password-match-validation',
      },
    },
  ],
})
export class PasswordInputComponent {
  @Input() control: FormControl;
  @Input() label: string;
  @Input() hasStarSymbol: boolean = true; // to add star symbol next to the label
}
