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
import { ProfileOffersListPageComponent } from './pages/profile/profile-offers-list-page/profile-offers-list-page.component';
import { ProfileOffersCreatePageComponent } from './pages/profile/profile-offers-create-page/profile-offers-create-page.component';
import { OffersPageComponent } from './pages/offers/offers-page/offers-page.component';
import { OfferDetailsPageComponent } from '../admin/pages/offers/offer-details-page/offer-details-page.component';
import { ProviderGuard } from '../guards/provider.guard';
import { SubscriberGuard } from '../guards/subscriber.guard';
import { ProviderSubscriberGuard } from '../guards/provider-subscriber.guard';
import { StaticPageComponent } from './pages/static-page/static-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ArticlesListPageComponent } from './pages/blog/articles-list-page/articles-list-page.component';
import { ArticleDetailsPageComponent } from './pages/blog/article-details-page/article-details-page.component';
import { ProvidersPageComponent } from './pages/providers/providers-page/providers-page.component';
import { ProviderDetailsPageComponent } from './pages/providers/provider-details-page/provider-details-page.component';
import { UserSignupComponent } from './pages/user-signup/user-signup.component';
import { ContactusPageComponent } from './pages/contactus-page/contactus-page.component';
import { CardInfoComponent } from './pages/card-info/card-info.component';

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
        path: 'user-signup',
        component: UserSignupComponent,
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
        canActivate: [ProviderSubscriberGuard],
        canActivateChild: [ProviderSubscriberGuard],
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
          { path: 'offers', component: ProfileOffersListPageComponent },
          {
            path: 'offers/create',
            component: ProfileOffersCreatePageComponent,
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
      {
        path: 'offers',
        component: OffersPageComponent,
      },
      {
        path: 'offers/:id',
        component: OfferDetailsPageComponent,
      },
      {
        path: 'page/:pageName',
        component: StaticPageComponent,
      },
      {
        path: 'blog',
        component: ArticlesListPageComponent,
      },
      {
        path: 'blog/:id',
        component: ArticleDetailsPageComponent,
      },
      {
        path: 'providers',
        component: ProvidersPageComponent,
      },
      {
        path: 'providers/:email',
        component: ProviderDetailsPageComponent,
      },
      {
        path: 'contactus',
        component: ContactusPageComponent,
      },
      {
        path: 'card/:card',
        component: CardInfoComponent,
      },

      { path: '**', component: PageNotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SiteRoutingModule {}
