import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';

import { AuthGuard } from './auth.guard';
import { MoneyHttpInterceptor } from './money-http-interceptor';
import { environment } from './../../environments/environment';

export function tokenGetter(): string {
  return localStorage.getItem('token');
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,

    SegurancaRoutingModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: environment.whiteListedDomains,
        blacklistedRoutes: environment.blackListedRoutes
      }
  })
  ],
  declarations: [LoginFormComponent],
  providers: [
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MoneyHttpInterceptor,
      multi: true
  },
  AuthGuard
  ]
})

export class SegurancaModule { }
