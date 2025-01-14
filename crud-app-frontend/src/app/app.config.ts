import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(), // Provide HttpClient globally
    provideRouter(routes), // Provide the router configuration
    importProvidersFrom(BrowserAnimationsModule), // Add BrowserAnimationsModule for animations
  ],
};
