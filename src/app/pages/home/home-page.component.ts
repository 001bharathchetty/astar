import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BusinessService } from '../../core/services/business.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {
  readonly businessService = inject(BusinessService);
  readonly copiedGstin = signal<boolean>(false);

  async copyGstin(): Promise<void> {
    const gstin = this.businessService.business.gstin;
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(gstin);
      }
      this.copiedGstin.set(true);
      setTimeout(() => this.copiedGstin.set(false), 2500);
    } catch (e) {
      console.warn('Failed to copy GSTIN', e);
    }
  }

  scrollToLocation(): void {
    if (typeof document !== 'undefined') {
      const el = document.getElementById('location-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
