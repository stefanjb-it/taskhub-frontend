import {ApplicationConfig, importProvidersFrom, isDevMode} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {JwtModule} from "@auth0/angular-jwt";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";
import { provideServiceWorker } from '@angular/service-worker';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(JwtModule.forRoot({
        config: {
            tokenGetter: tokenGetter,
            allowedDomains: ["localhost:8000"],
        },
    }), ToastrModule.forRoot({
        timeOut: 2000,
        easeTime: 250,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
    }), BrowserAnimationsModule),
    provideAnimations(),
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    })
],
};
