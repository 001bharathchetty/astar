import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ContentService } from '../../core/services/content.service';
import { SeoService } from '../../core/services/seo.service';
import { ExploreNextComponent } from '../../shared/components/explore-next/explore-next.component';
import { ProjectInquiryDialogComponent } from '../../features/modals/project-inquiry-dialog/project-inquiry-dialog.component';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    ExploreNextComponent
  ],
  templateUrl: './services-page.component.html'
})
export class ServicesPageComponent implements OnInit {
  readonly content = inject(ContentService);
  private readonly dialog = inject(MatDialog);
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setSeoData({
      title: 'Commercial Electrical Contracting Services | AStar',
      description: 'Commercial electrical installation, construction-stage electrical works, systems and infrastructure, and project coordination. Scopes shaped around project documentation and site requirements.',
      url: '/services'
    });
  }

  openInquiryDialog(): void {
    this.dialog.open(ProjectInquiryDialogComponent, {
      panelClass: 'inquiry-modal-panel',
      autoFocus: false
    });
  }
}
