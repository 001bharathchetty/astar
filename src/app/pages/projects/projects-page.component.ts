import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ContentService } from '../../core/services/content.service';
import { SeoService } from '../../core/services/seo.service';
import { ExploreNextComponent } from '../../shared/components/explore-next/explore-next.component';
import { ProjectInquiryDialogComponent } from '../../features/modals/project-inquiry-dialog/project-inquiry-dialog.component';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule, ExploreNextComponent],
  templateUrl: './projects-page.component.html'
})
export class ProjectsPageComponent implements OnInit {
  readonly content = inject(ContentService);
  private readonly dialog = inject(MatDialog);
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setSeoData({
      title: 'Commercial Electrical Projects | AStar Electricals',
      description: 'Documented commercial electrical contracting projects across workplace, retail, and commercial facilities. Scope delivery aligned with construction programmes and specifications.',
      url: '/projects'
    });
  }

  openInquiryDialog(): void {
    this.dialog.open(ProjectInquiryDialogComponent, {
      panelClass: 'inquiry-modal-panel',
      autoFocus: 'first-tabbable',
      restoreFocus: true
    });
  }
}
