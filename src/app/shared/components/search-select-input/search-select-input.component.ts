import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-select-input',
  templateUrl: './search-select-input.component.html',
  styleUrls: ['./search-select-input.component.css'],
})
export class SearchSelectInputComponent {
  @Input() control: FormControl;
  @Input() label: string;
  @Input() options: { id: number | string; name: string }[];
  @Input() placeHolder = 'Select option';
}
