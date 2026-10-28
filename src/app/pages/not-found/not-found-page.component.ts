import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContentService } from '../../core/services/content.service';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './not-found-page.component.html'
})
export class NotFoundPageComponent implements OnInit {
  readonly content = inject(ContentService);
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setSeoData({
      title: 'Page Not Found | AStar Electricals',
      description: 'The commercial contracting page or resource you are looking for does not exist or has been moved.',
      url: '/404'
    });
  }
}
