import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { httpInterceptor } from './core/interceptor/http.interceptor';

@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [BrowserModule, AppRoutingModule, AuthModule, NgxPaginationModule],
  providers: [
    provideClientHydration(),
    provideHttpClient(withInterceptors([httpInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
