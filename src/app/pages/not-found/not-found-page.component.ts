import { Component, inject, OnInit, signal, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ContentService } from '../../core/services/content.service';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule, MatSnackBarModule],
  templateUrl: './not-found-page.component.html'
})
export class NotFoundPageComponent implements OnInit {
  readonly content = inject(ContentService);
  private readonly seo = inject(SeoService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly platformId = inject(PLATFORM_ID);

  readonly attemptedPath = signal<string>('/unknown');
  readonly isReporting = signal<boolean>(false);
  readonly reported = signal<boolean>(false);

  ngOnInit(): void {
    let path = this.router.url;
    if ((!path || path === '/' || path === '/404') && isPlatformBrowser(this.platformId)) {
      path = window.location.pathname;
    }
    this.attemptedPath.set(path || '/unknown');

    this.seo.setSeoData({
      title: 'Page Not Found | AStar Electricals',
      description: 'The commercial contracting page or resource you are looking for does not exist or has been moved.',
      url: '/404'
    });
  }

  get contactQueryParams(): Record<string, string> {
    return {
      intent: 'broken-link',
      route: this.attemptedPath(),
      message: `Issue Report: 404 Page Not Found encountered on route: ${this.attemptedPath()}`
    };
  }

  async reportQuickly(): Promise<void> {
    if (this.isReporting() || this.reported()) return;

    this.isReporting.set(true);

    const referrer = isPlatformBrowser(this.platformId) && document.referrer ? document.referrer : 'Direct';
    const payload = new URLSearchParams({
      'form-name': 'contact',
      intent: 'broken-link',
      name: 'AStar Visitor (404 Auto-Report)',
      email: '404-report@astarelectricals.com',
      organization: 'Website 404 Monitor',
      location: 'Bengaluru',
      message: `Automatic 404 report for missing route: ${this.attemptedPath()} | Referrer: ${referrer}`
    });

    try {
      if (typeof fetch !== 'undefined') {
        await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: payload.toString()
        });
      }

      this.reported.set(true);
      this.snackBar.open(
        `Report received for ${this.attemptedPath()}! Thank you for letting us know.`,
        'Dismiss',
        {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        }
      );
    } catch {
      this.reported.set(true);
      this.snackBar.open(
        `Report registered for ${this.attemptedPath()}. Thank you!`,
        'Dismiss',
        {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        }
      );
    } finally {
      this.isReporting.set(false);
    }
  }
}
