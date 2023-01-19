import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProviderSignupComponent } from './pages/provider-signup/provider-signup.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SubscribeNowPageComponent } from './pages/subscribe-now-page/subscribe-now-page.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SiteRoutingModule {}
