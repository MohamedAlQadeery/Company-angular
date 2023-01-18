import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TuiValidationError } from '@taiga-ui/cdk';

@Pipe({
  name: 'translateError',
})
export class TranslateErrorPipe implements PipeTransform {
  constructor(private _translateService: TranslateService) {}
  transform(
    value: TuiValidationError<Record<string, unknown>> | null
  ): string | null {
    if (value == null) return null;

    let message = value?.message?.toString();
    let translatedMessage = this._translateService.instant(message!);

    return translatedMessage;
  }
}
