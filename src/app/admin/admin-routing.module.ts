import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProviderListPageComponent } from './pages/providers/provider-list-page/provider-list-page.component';
import { ProviderDetailsPageComponent } from './pages/providers/provider-details-page/provider-details-page.component';
import { SubscriberListPageComponent } from './pages/subscriber/subscriber-list-page/subscriber-list-page.component';
import { SubscriberDetailsPageComponent } from './pages/subscriber/subscriber-details-page/subscriber-details-page.component';
import { CategoryListPageComponent } from './pages/category/category-list-page/category-list-page.component';
import { CategoryEditPageComponent } from './pages/category/category-edit-page/category-edit-page.component';
import { CategoryCreatePageComponent } from './pages/category/category-create-page/category-create-page.component';
import { PlansListPageComponent } from './pages/plan/plans-list-page/plans-list-page.component';
import { PlansCreatePageComponent } from './pages/plan/plans-create-page/plans-create-page.component';
import { OfferListPageComponent } from './pages/offers/offer-list-page/offer-list-page.component';
import { OfferDetailsPageComponent } from './pages/offers/offer-details-page/offer-details-page.component';
import { PlansEditPageComponent } from './pages/plan/plans-edit-page/plans-edit-page.component';
import { ServiceListComponent } from './pages/provider-service/service-list/service-list.component';
import { StaticPageCreatePageComponent } from './pages/static-page/static-page-create-page/static-page-create-page.component';
import { StaticPageEditPageComponent } from './pages/static-page/static-page-edit-page/static-page-edit-page.component';
import { StaticPageListPageComponent } from './pages/static-page/static-page-list-page/static-page-list-page.component';
import { GeneralServiceCreatePageComponent } from './pages/general-service/general-service-create-page/general-service-create-page.component';
import { GeneralServiceEditPageComponent } from './pages/general-service/general-service-edit-page/general-service-edit-page.component';
import { GeneralServiceListPageComponent } from './pages/general-service/general-service-list-page/general-service-list-page.component';
import { ArticleCreatePageComponent } from './pages/article/article-create-page/article-create-page.component';
import { ArticleEditPageComponent } from './pages/article/article-edit-page/article-edit-page.component';
import { ArticleListPageComponent } from './pages/article/article-list-page/article-list-page.component';
import { BlogCreatePageComponent } from './pages/blog/blog-create-page/blog-create-page.component';
import { BlogEditPageComponent } from './pages/blog/blog-edit-page/blog-edit-page.component';
import { BlogListPageComponent } from './pages/blog/blog-list-page/blog-list-page.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'providers', component: ProviderListPageComponent },
      { path: 'providers/:id', component: ProviderDetailsPageComponent },
      { path: 'subscribers', component: SubscriberListPageComponent },
      { path: 'subscribers/:id', component: SubscriberDetailsPageComponent },
      { path: 'category', component: CategoryListPageComponent },
      { path: 'category/create', component: CategoryCreatePageComponent },
      { path: 'category/edit/:id', component: CategoryEditPageComponent },
      { path: 'plans', component: PlansListPageComponent },
      { path: 'plans/create', component: PlansCreatePageComponent },
      { path: 'plans/edit/:id', component: PlansEditPageComponent },
      { path: 'offers', component: OfferListPageComponent },
      { path: 'offers/:id', component: OfferDetailsPageComponent },
      { path: 'services', component: ServiceListComponent },
      { path: 'StaticPage', component: StaticPageListPageComponent },
      { path: 'StaticPage/create', component: StaticPageCreatePageComponent },
      { path: 'StaticPage/edit/:id', component: StaticPageEditPageComponent },
      { path: 'GeneralService', component: GeneralServiceListPageComponent },
      { path: 'GeneralService/create', component: GeneralServiceCreatePageComponent },
      { path: 'GeneralService/edit/:id', component: GeneralServiceEditPageComponent },
      { path: 'Article', component: ArticleListPageComponent },
      { path: 'Article/create', component: ArticleCreatePageComponent },
      { path: 'Article/edit/:id', component: ArticleEditPageComponent },
      { path: 'Blog', component: BlogListPageComponent },
      { path: 'Blog/create', component: BlogCreatePageComponent },
      { path: 'Blog/edit/:id', component: BlogEditPageComponent },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
