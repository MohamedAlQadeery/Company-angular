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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
