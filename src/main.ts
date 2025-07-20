import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { ApiServiceService } from './app/api-service.service';

bootstrapApplication(AppComponent, {
  providers: [
    ApiServiceService,
    provideHttpClient(withInterceptorsFromDi())
  ]
});