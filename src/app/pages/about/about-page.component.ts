import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ContentService } from '../../core/services/content.service';
import { SeoService } from '../../core/services/seo.service';
import { CommercialShowcaseComponent } from '../../shared/components/commercial-showcase/commercial-showcase.component';
import { ExploreNextComponent } from '../../shared/components/explore-next/explore-next.component';
import { ProjectInquiryDialogComponent } from '../../features/modals/project-inquiry-dialog/project-inquiry-dialog.component';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    CommercialShowcaseComponent,
    ExploreNextComponent
  ],
  templateUrl: './about-page.component.html'
})
export class AboutPageComponent implements OnInit {
  readonly content = inject(ContentService);
  private readonly dialog = inject(MatDialog);
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setSeoData({
      title: 'About AStar Electricals | Commercial Electrical Contractors',
      description: 'Learn about AStar Electricals. Commercial electrical contracting focused on quality in execution, coordination with construction programmes, responsibility, and dependable delivery across Bengaluru, Chennai, Hyderabad, and Pan-India.',
      url: '/about'
    });
  }

  openInquiryDialog(): void {
    this.dialog.open(ProjectInquiryDialogComponent, {
      panelClass: 'inquiry-modal-panel',
      autoFocus: false
    });
  }
}
