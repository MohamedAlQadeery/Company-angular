import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TuiInputModule } from '@taiga-ui/kit';
import { TuiDataListModule } from '@taiga-ui/core';
import { TuiDataListWrapperModule, TuiSelectModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiInputFilesModule } from '@taiga-ui/kit';
import { TuiFieldErrorPipeModule } from '@taiga-ui/kit';
import { TuiErrorModule } from '@taiga-ui/core';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { TranslateErrorPipe } from './helpers/translate-error.pipe';
import { SelectInputComponent } from './components/select-input/select-input.component';
import { TuiInputPasswordModule } from '@taiga-ui/kit';
import { PasswordInputComponent } from './components/password-input/password-input.component';
import { NumberCountInputComponent } from './components/number-count-input/number-count-input.component';
import { TuiInputCountModule } from '@taiga-ui/kit';
import { FileInputComponent } from './components/file-input/file-input.component';
import { DateInputComponent } from './components/date-input/date-input.component';
import { TuiInputDateModule } from '@taiga-ui/kit';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    InputFieldComponent,
    TranslateErrorPipe,
    SelectInputComponent,
    PasswordInputComponent,
    NumberCountInputComponent,
    FileInputComponent,
    DateInputComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
    }),
    ReactiveFormsModule,
    TuiInputModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiButtonModule,
    TuiInputFilesModule,
    TuiFieldErrorPipeModule,
    TuiErrorModule,
    TuiInputPasswordModule,
    TuiInputCountModule,
    TuiInputDateModule,
  ],
  exports: [
    TranslateModule,
    TuiInputModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiInputFilesModule,
    TuiFieldErrorPipeModule,
    TuiErrorModule,
    InputFieldComponent,
    TranslateErrorPipe,
    SelectInputComponent,
    PasswordInputComponent,
    NumberCountInputComponent,
    FileInputComponent,
    DateInputComponent,
  ],
})
export class SharedModule {}
