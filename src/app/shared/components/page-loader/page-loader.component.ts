import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-page-loader',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    @if (loadingService.isLoading()) {
      <!-- Precision Top Accent Progress Bar -->
      <div
        class="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-stone-200/50 dark:bg-stone-800/50 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div class="h-full bg-[#ea1c24] shadow-[0_0_10px_#ea1c24] astar-progress-bar"></div>
      </div>

      <!-- Centered Frosted Loading Overlay -->
      <div
        class="fixed inset-0 z-[99] flex items-center justify-center bg-stone-900/25 dark:bg-black/45 backdrop-blur-[2px] transition-all duration-200"
        role="status"
        aria-live="polite"
      >
        <div
          class="bg-white/95 dark:bg-stone-900/95 border border-stone-200/90 dark:border-stone-800/90 rounded-3xl shadow-2xl p-6 sm:p-7 flex flex-col items-center gap-3.5 min-w-[200px] text-center transform animate-in fade-in zoom-in-95 duration-200"
        >
          <!-- Material Progress Spinner styled in AStar Electric Red -->
          <div class="relative w-12 h-12 flex items-center justify-center">
            <mat-progress-spinner
              class="astar-page-spinner"
              mode="indeterminate"
              [diameter]="48"
              [strokeWidth]="4"
              aria-hidden="true"
            />
          </div>

          <!-- Status Text -->
          <div class="flex flex-col items-center gap-0.5">
            <span class="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 font-brand">
              AStar
            </span>
            <span class="text-[11px] font-medium text-stone-500 dark:text-stone-400">
              {{ loadingService.loadingMessage() }}
            </span>
          </div>

          <!-- Screen Reader Accessible Live Status -->
          <span class="sr-only">{{ loadingService.loadingMessage() }}</span>
        </div>
      </div>
    }
  `,
  styles: [`
    .astar-progress-bar {
      width: 100%;
      animation: astar-indeterminate-bar 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }

    @keyframes astar-indeterminate-bar {
      0% {
        transform: translateX(-100%);
      }
      50% {
        transform: translateX(0%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .astar-progress-bar {
        animation: none;
        width: 100%;
      }
    }
  `]
})
export class PageLoaderComponent {
  readonly loadingService = inject(LoadingService);
}
