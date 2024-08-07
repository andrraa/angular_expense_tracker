import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { httpInterceptor } from './core/interceptor/http.interceptor';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FormExpenseComponent } from './shared/components/form-expense/form-expense.component';
import { FormExpenseTypeComponent } from './shared/components/form-expense-type/form-expense-type.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FormExpenseComponent,
    FormExpenseTypeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    FormsModule,
    NgxPaginationModule,
    NgSelectModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withInterceptors([httpInterceptor]), withFetch()),
    provideAnimations(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
