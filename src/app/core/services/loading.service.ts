import { Injectable, inject, signal } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  Event as RouterEvent
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private readonly router = inject(Router);

  /** Signal reflecting active route transition or page loading status */
  readonly isLoading = signal<boolean>(false);

  /** Accessible status message */
  readonly loadingMessage = signal<string>('Loading page...');

  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        if (this.debounceTimer) {
          clearTimeout(this.debounceTimer);
        }
        // Small 30ms debounce prevents rapid 1-frame flashes on instant in-memory transitions
        this.debounceTimer = setTimeout(() => {
          this.isLoading.set(true);
        }, 30);
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        if (this.debounceTimer) {
          clearTimeout(this.debounceTimer);
          this.debounceTimer = null;
        }
        this.isLoading.set(false);
      }
    });
  }

  /**
   * Programmatically set loading status for manual data fetching or form actions
   */
  show(message: string = 'Loading page...'): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
    this.loadingMessage.set(message);
    this.isLoading.set(true);
  }

  /**
   * Complete loading state
   */
  hide(): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
    this.isLoading.set(false);
  }
}
