import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  
  // Theme state: true = dark, false = light
  readonly isDark = signal<boolean>(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('astar-theme');
      if (saved) {
        this.isDark.set(saved === 'dark');
      } else {
        // Default to light mode
        this.isDark.set(false);
      }

      this.applyTheme(this.isDark());

      effect(() => {
        const dark = this.isDark();
        this.applyTheme(dark);
      });
    }
  }

  toggleTheme(): void {
    this.isDark.update(d => !d);
  }

  private applyTheme(dark: boolean): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('astar-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('astar-theme', 'light');
    }
  }
}
