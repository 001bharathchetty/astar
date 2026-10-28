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
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    CommercialShowcaseComponent,
    ExploreNextComponent
  ],
  templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit {
  readonly content = inject(ContentService);
  private readonly dialog = inject(MatDialog);
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setSeoData({
      title: 'AStar Electricals | Commercial Electrical Contracting',
      description: 'Electrical contracting for commercial spaces. AStar Electricals works with commercial property developers, builders, construction companies, and project teams across Bengaluru, Chennai, Hyderabad, and Pan-India. Powering Quality. Built on Trust.',
      url: '/'
    });
  }

  openInquiryDialog(): void {
    this.dialog.open(ProjectInquiryDialogComponent, {
      panelClass: 'inquiry-modal-panel',
      autoFocus: false
    });
  }
}
