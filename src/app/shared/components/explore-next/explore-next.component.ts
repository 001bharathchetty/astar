import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContentService, NextPathItem, PageKey } from '../../../core/services/content.service';

@Component({
  selector: 'app-explore-next',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './explore-next.component.html'
})
export class ExploreNextComponent implements OnInit {
  private readonly content = inject(ContentService);

  @Input({ required: true }) page!: PageKey;
  @Input() variant: 'section' | 'inline' = 'inline';
  @Input() eyebrow = 'Explore AStar';
  @Input() heading = 'Next Logical Paths';
  @Input() subtitle = 'Follow the scope, review our standards, or start a project conversation.';

  paths: NextPathItem[] = [];

  ngOnInit(): void {
    this.paths = this.content.getNextPaths(this.page);
  }
}
