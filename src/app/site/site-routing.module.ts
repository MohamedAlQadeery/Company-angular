import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProviderSignupComponent } from './pages/provider-signup/provider-signup.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SubscribeNowPageComponent } from './pages/subscribe-now-page/subscribe-now-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { PricingPageComponent } from './pages/pricing-page/pricing-page.component';
import { ProfileLayoutPageComponent } from './pages/profile/profile-layout-page/profile-layout-page.component';
import { ProfileHomePageComponent } from './pages/profile/profile-home-page/profile-home-page.component';
import { ProfileEditInfoPageComponent } from './pages/profile/profile-edit-info-page/profile-edit-info-page.component';
import { ProfileCardsPageComponent } from './pages/profile/profile-cards-page/profile-cards-page.component';
import { ProfileCardInfoPageComponent } from './pages/profile/profile-card-info-page/profile-card-info-page.component';
import { ProfileServicesListPageComponent } from './pages/profile/profile-services-list-page/profile-services-list-page.component';
import { ProfileServicesCreatePageComponent } from './pages/profile/profile-services-create-page/profile-services-create-page.component';
import { ProfileServicesEditPageComponent } from './pages/profile/profile-services-edit-page/profile-services-edit-page.component';
import { ServicesPageComponent } from './pages/services/services-page/services-page.component';
import { ServicesDetailsComponent } from './pages/services/services-details/services-details.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
      {
        path: 'join-provider',
        component: ProviderSignupComponent,
      },
      {
        path: 'subscribe',
        component: SubscribeNowPageComponent,
      },
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'pricing',
        component: PricingPageComponent,
      },
      {
        path: 'profile',
        component: ProfileLayoutPageComponent,
        children: [
          { path: '', component: ProfileHomePageComponent },
          { path: 'home', component: ProfileHomePageComponent },
          { path: 'edit', component: ProfileEditInfoPageComponent },
          { path: 'card', component: ProfileCardInfoPageComponent },
          { path: 'services', component: ProfileServicesListPageComponent },
          {
            path: 'services/create',
            component: ProfileServicesCreatePageComponent,
          },
          {
            path: 'services/edit/:id',
            component: ProfileServicesEditPageComponent,
          },
        ],
      },

      {
        path: 'services',
        component: ServicesPageComponent,
      },
      {
        path: 'services/:id',
        component: ServicesDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SiteRoutingModule {}
