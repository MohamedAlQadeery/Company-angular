import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  currentlang = 'en';
  HandleLanguageChanges(lang: string) {
    this.currentlang = lang;
    console.log(this.currentlang);
  }
}
