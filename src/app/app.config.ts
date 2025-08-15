import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from '../interceptor/auth-interceptor';
import { AuthenticationService } from './components/authentication/services/authentication-service';
import { PAGINATION_REQUEST } from '../injectors/common-injector';
import { PaginationRequest } from './models/pagination-request';
import { paginationRequestFactory } from '../factories/pagination-request-factory';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(
      AuthenticationService // Import any additional modules here, e.g., HttpClientModule, FormsModule, etc.
    ),
    {
      provide: PAGINATION_REQUEST,
      useFactory: paginationRequestFactory,
    },
  ],
};
