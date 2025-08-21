import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { Config } from '../assets/environments/config';
import { paginationRequestFactory } from '../factories/pagination-request-factory';
import { CONFIG_FILE_PATH, PAGINATION_REQUEST } from '../injectors/common-injector';
import { authInterceptor } from '../interceptor/auth-interceptor';
import { routes } from './app.routes';
import { AuthenticationService } from './components/authentication/services/authentication-service';
import { ConfigService } from './services/app-config-service';

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
    {
      provide: CONFIG_FILE_PATH,
      useValue: "/assets/environments/config.json"
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService) => async () => {
        await configService.load();
      },
      deps: [ConfigService],
      multi:true
    },
    {
      provide: Config,
      useFactory: (configService: ConfigService) => {
        return configService.value;
      },
      deps: [ConfigService]
    }
  ],
};
