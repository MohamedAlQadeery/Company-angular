import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css'],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'required-input',
        email: `Enter a valid email`,
      },
    },
  ],
})
export class InputFieldComponent {
  @Input() control: FormControl;
  @Input() label: string;
  @Input() hasStarSymbol: boolean = true; // to add star symbol next to the label

  constructor(private _translateService: TranslateService) {}
}
