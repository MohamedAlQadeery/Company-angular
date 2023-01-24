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

@NgModule({
  declarations: [
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    ProviderSignupComponent,
    SubscribeNowPageComponent,
    LoginPageComponent,
  ],
  imports: [CommonModule, SiteRoutingModule, SharedModule],
})
export class SiteModule {}
