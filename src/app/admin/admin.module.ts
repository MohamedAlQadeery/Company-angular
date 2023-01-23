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
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
