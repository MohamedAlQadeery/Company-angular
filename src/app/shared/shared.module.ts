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
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [InputFieldComponent, TranslateErrorPipe],
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
  ],
})
export class SharedModule {}
