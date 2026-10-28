import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ThemeService } from '../../../core/services/theme.service';
import { ContentService } from '../../../core/services/content.service';
import { ProjectInquiryDialogComponent } from '../../../features/modals/project-inquiry-dialog/project-inquiry-dialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  readonly themeService = inject(ThemeService);
  readonly content = inject(ContentService);
  private readonly dialog = inject(MatDialog);

  readonly mobileMenuOpen = signal<boolean>(false);

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  openInquiryDialog(): void {
    this.closeMobileMenu();
    this.dialog.open(ProjectInquiryDialogComponent, {
      panelClass: 'inquiry-modal-panel',
      autoFocus: false
    });
  }
}
