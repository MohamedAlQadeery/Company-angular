import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';

import { ProviderSignupComponent } from './pages/provider-signup/provider-signup.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SubscribeNowPageComponent } from './pages/subscribe-now-page/subscribe-now-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { PricingPageComponent } from './pages/pricing-page/pricing-page.component';
import { ProfileHomePageComponent } from './pages/profile/profile-home-page/profile-home-page.component';
import { ProfileEditInfoPageComponent } from './pages/profile/profile-edit-info-page/profile-edit-info-page.component';
import { ProfileCardsPageComponent } from './pages/profile/profile-cards-page/profile-cards-page.component';
import { ProfileLayoutPageComponent } from './pages/profile/profile-layout-page/profile-layout-page.component';
import { ProfileCardInfoPageComponent } from './pages/profile/profile-card-info-page/profile-card-info-page.component';
import { ProfileServicesListPageComponent } from './pages/profile/profile-services-list-page/profile-services-list-page.component';
import { ProfileServicesCreatePageComponent } from './pages/profile/profile-services-create-page/profile-services-create-page.component';
import { ProfileServicesEditPageComponent } from './pages/profile/profile-services-edit-page/profile-services-edit-page.component';
import { ServicesPageComponent } from './pages/services/services-page/services-page.component';
import { ServicesDetailsComponent } from './pages/services/services-details/services-details.component';
import { ServicesRowComponent } from './components/services-row/services-row.component';
import { ProfileOffersListPageComponent } from './pages/profile/profile-offers-list-page/profile-offers-list-page.component';
import { ProfileOffersCreatePageComponent } from './pages/profile/profile-offers-create-page/profile-offers-create-page.component';
import { OffersPageComponent } from './pages/offers/offers-page/offers-page.component';
import { OffersDetailsComponent } from './pages/offers/offers-details/offers-details.component';
import { OffersRowComponent } from './components/offers-row/offers-row.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
@NgModule({
  declarations: [
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    ProviderSignupComponent,
    SubscribeNowPageComponent,
    LoginPageComponent,
    PricingPageComponent,
    ProfileHomePageComponent,
    ProfileEditInfoPageComponent,
    ProfileCardsPageComponent,
    ProfileLayoutPageComponent,
    ProfileCardInfoPageComponent,
    ProfileServicesListPageComponent,
    ProfileServicesCreatePageComponent,
    ProfileServicesEditPageComponent,
    ServicesPageComponent,
    ServicesDetailsComponent,
    ServicesRowComponent,
    ProfileOffersListPageComponent,
    ProfileOffersCreatePageComponent,
    OffersPageComponent,
    OffersDetailsComponent,
    OffersRowComponent,
  ],
  imports: [CommonModule, SiteRoutingModule, SharedModule, SlickCarouselModule],
})
export class SiteModule {}
