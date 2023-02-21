import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap, tap } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { LangService } from 'src/app/services/language.service';
import { ProviderService } from 'src/app/services/provider.service';
import { IProviderResponse } from 'src/app/shared/interfaces/UsersDto';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-providers-page',
  templateUrl: './providers-page.component.html',
  styleUrls: ['./providers-page.component.css'],
})
export class ProvidersPageComponent implements OnInit {
  constructor(
    private _providerService: ProviderService,
    private _categoryService: CategoryService,

    private _langService: LangService,
    private _actviedRoute: ActivatedRoute
  ) {}

  imagesUrl = `${environment.baseURL}/images/thumbs/small`;
  loadingFinished = false;
  providers: IProviderResponse[] = [];
  private originalProviders: IProviderResponse[]; // not filterd result

  //#region providers page
  searchFormGroup: FormGroup;
  searchControl = new FormControl('');
  categoryControl = new FormControl('');
  //#endregion

  //#region observables
  categories$: Observable<{ id: number; name: string }[]>;
  lang$ = this._langService.currentLang$;
  providersWithReviews$: Observable<IProviderResponse[]>;

  //#endregion

  ngOnInit(): void {
    this.providersWithReviews$ = this._providerService.GetAllReviews().pipe(
      switchMap((rev) => {
        return this._providerService.GetAllProviders().pipe(
          map((res) => {
            return res.map((p) => {
              const stars = rev.find((r) => r.providerId == p.id)?.stars;
              return { ...p, stars } as IProviderResponse;
            });
          })
        );
      })
    );
    this.providersWithReviews$.subscribe((res) => {
      console.log(res);
      this.originalProviders = res;
      this.providers = res;
      this.loadingFinished = true;

      let searchParams = this._actviedRoute.snapshot.queryParams;
      if (searchParams['name']) {
        this.HandleSearchFromQuery(searchParams['name']);
      }
    });

    this.searchFormGroup = new FormGroup({
      search: this.searchControl,
      categoryId: this.categoryControl,
    });

    this.categories$ = this._categoryService.GetAllCategories().pipe(
      map((res) => {
        return res.map((c) => ({ id: c.id, name: c.name }));
      })
    );
  }

  HandleSearch() {
    // console.log(this.searchFormGroup.value);
    const search: string = this.searchFormGroup.value['search']!;
    const categoryId: number = this.searchFormGroup.value['categoryId']!;

    this.providers = this.originalProviders.filter((provider) => {
      if (
        search &&
        !provider.companyName.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }
      if (categoryId && provider.categoryId !== categoryId) {
        return false;
      }
      return true;
    });

    this.searchFormGroup.reset();
  }

  HandleSearchFromQuery(name: string) {
    this.providers = this.originalProviders.filter((provider) => {
      if (!provider.companyName.toLowerCase().includes(name.toLowerCase())) {
        return false;
      }

      return true;
    });

    console.log(this.providers);
  }
}
