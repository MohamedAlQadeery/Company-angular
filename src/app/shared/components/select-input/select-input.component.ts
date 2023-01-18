import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  TuiContextWithImplicit,
  TuiStringHandler,
  tuiPure,
} from '@taiga-ui/cdk';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.css'],
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
export class SelectInputComponent {
  @Input() control: FormControl;
  @Input() label: string;
  @Input() hasStarSymbol: boolean = true; // to add star symbol next to the label
  @Input() options: { id: number; name: string }[];
  constructor() {}

  @tuiPure
  stringify(
    items: readonly { id: number; name: string }[]
  ): TuiStringHandler<TuiContextWithImplicit<number>> {
    const map = new Map(
      items.map(({ id, name }) => [id, name] as [number, string])
    );

    return ({ $implicit }: TuiContextWithImplicit<number>) =>
      map.get($implicit) || ``;
  }
}
