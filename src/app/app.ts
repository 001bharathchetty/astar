import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { FloatingWhatsappComponent } from './shared/components/floating-whatsapp/floating-whatsapp.component';
import { PageLoaderComponent } from './shared/components/page-loader/page-loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    FloatingWhatsappComponent,
    PageLoaderComponent
  ],
  template: `
    <!-- Skip to Main Content Link for Accessibility -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-500 focus:text-stone-950 focus:font-bold focus:rounded-lg focus:shadow-lg focus:outline-none"
    >
      Skip to main content
    </a>

    <!-- Global Route Transition Page Loading Spinner -->
    <app-page-loader />

    <div class="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors">
      <app-header />
      <div class="flex-1">
        <router-outlet />
      </div>
      <app-footer />
      <app-floating-whatsapp />
    </div>
  `
})
export class AppComponent {}
export { AppComponent as App };
