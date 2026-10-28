import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BusinessService } from '../../../core/services/business.service';

import { APP_VERSION } from '../../../core/version';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  readonly businessService = inject(BusinessService);
  readonly currentYear = new Date().getFullYear();
  readonly version = APP_VERSION;

  scrollToTop(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
