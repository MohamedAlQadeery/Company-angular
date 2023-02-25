import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Observable, from, of } from 'rxjs';

export default class Validation {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['mustMatch']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ mustMatch: true });
        return { mustMatch: true };
      } else {
        return null;
      }
    };
  }
}

// Define the dimensionsValidator function as before
export function dimensionsValidator(
  expectedWidth: number,
  expectedHeight: number
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const file = control.value;
    if (!file) {
      return of(null); // Return an Observable that emits null if no file is selected
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    return from(
      new Promise<ValidationErrors | null>((resolve) => {
        reader.onload = () => {
          const img = new Image();
          img.onload = () => {
            if (img.width === expectedWidth && img.height === expectedHeight) {
              resolve(null); // The dimensions are valid, resolve with null
            } else {
              resolve({ dimensions: true }); // The dimensions are invalid, resolve with an error object
            }
          };
          img.src = reader.result as string;
        };
      })
    );
  };
}
