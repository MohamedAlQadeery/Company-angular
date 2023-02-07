import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProviderListPageComponent } from './pages/providers/provider-list-page/provider-list-page.component';
import { SharedModule } from '../shared/shared.module';
import { ProviderDetailsPageComponent } from './pages/providers/provider-details-page/provider-details-page.component';
import { SubscriberListPageComponent } from './pages/subscriber/subscriber-list-page/subscriber-list-page.component';
import { SubscriberDetailsPageComponent } from './pages/subscriber/subscriber-details-page/subscriber-details-page.component';
import { CategoryListPageComponent } from './pages/category/category-list-page/category-list-page.component';
import { CategoryCreatePageComponent } from './pages/category/category-create-page/category-create-page.component';
import { CategoryEditPageComponent } from './pages/category/category-edit-page/category-edit-page.component';
import { PlansListPageComponent } from './pages/plan/plans-list-page/plans-list-page.component';
import { PlansDetailsPageComponent } from './pages/plan/plans-details-page/plans-details-page.component';
import { OfferListPageComponent } from './pages/offers/offer-list-page/offer-list-page.component';
import { OfferDetailsPageComponent } from './pages/offers/offer-details-page/offer-details-page.component';
import { PlansCreatePageComponent } from './pages/plan/plans-create-page/plans-create-page.component';
import { PlansEditPageComponent } from './pages/plan/plans-edit-page/plans-edit-page.component';
import { OfferEditPageComponent } from './pages/offers/offer-edit-page/offer-edit-page.component';
import { OfferCreatePageComponent } from './pages/offers/offer-create-page/offer-create-page.component';
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

@NgModule({
  declarations: [
    AdminLayoutComponent,
    HomePageComponent,
    SidebarComponent,
    ProviderListPageComponent,
    ProviderDetailsPageComponent,
    SubscriberListPageComponent,
    SubscriberDetailsPageComponent,
    CategoryListPageComponent,
    CategoryCreatePageComponent,
    CategoryEditPageComponent,
    PlansListPageComponent,
    PlansDetailsPageComponent,
    OfferListPageComponent,
    OfferDetailsPageComponent,
    PlansCreatePageComponent,
    PlansEditPageComponent,
    OfferEditPageComponent,
    OfferCreatePageComponent,
    ServiceListComponent,
    StaticPageListPageComponent,
    StaticPageCreatePageComponent,
    StaticPageEditPageComponent,
    GeneralServiceListPageComponent,
    GeneralServiceCreatePageComponent,
    GeneralServiceEditPageComponent,
    ArticleListPageComponent,
    ArticleCreatePageComponent,
    ArticleEditPageComponent,
    BlogListPageComponent,
    BlogCreatePageComponent,
    BlogEditPageComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
