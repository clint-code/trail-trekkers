import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
//import { httpInterceptorInterceptor } from './interceptors/http-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({
    eventCoalescing: true
  }),
  provideRouter(routes),
  provideAnimations(),
  provideHttpClient(
    //withInterceptors([httpInterceptorInterceptor]),
    withFetch()
  ),
  //  provideHttpClient(), 
  provideClientHydration(withEventReplay())]
};
