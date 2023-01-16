import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './componenets/footer/footer.component';
import { LayoutComponent } from './componenets/layout/layout.component';
import { ProviderSignupComponent } from './pages/provider-signup/provider-signup.component';

@NgModule({
  declarations: [HomePageComponent, HeaderComponent, FooterComponent, LayoutComponent, ProviderSignupComponent],
  imports: [CommonModule, SiteRoutingModule, SharedModule],
})
export class SiteModule {}
