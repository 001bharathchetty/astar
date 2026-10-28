import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../../core/services/content.service';

@Component({
  selector: 'app-floating-whatsapp',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Floating WhatsApp Action Component -->
    <aside
      class="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex items-center gap-3 select-none pointer-events-auto"
      aria-label="WhatsApp Quick Connect"
    >
      <!-- Expandable Desktop Label / Tooltip -->
      <a
        [href]="content.brand.whatsappUrl"
        target="_blank"
        rel="noopener noreferrer"
        [attr.aria-label]="'Chat with AStar Electricals on WhatsApp at ' + content.brand.phone"
        class="group relative flex items-center focus:outline-none"
      >
        <!-- Text pill on hover / focus for desktop -->
        <span
          class="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 mr-3 rounded-full bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs font-bold shadow-xl border border-stone-200 dark:border-stone-800 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-200"
        >
          <span class="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
          <span>Chat on WhatsApp</span>
          <span class="font-mono text-[11px] text-stone-500 dark:text-stone-400">({{ content.brand.phone }})</span>
        </span>

        <!-- Main Vibrant Circular Floating Button -->
        <div
          class="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1da84d] text-white flex items-center justify-center shadow-2xl hover:shadow-[#25D366]/40 hover:scale-110 active:scale-95 transition-all duration-300 focus-visible:ring-4 focus-visible:ring-emerald-400 focus-visible:outline-none"
        >
          <!-- Subtle Pulse Ping Wave Ring -->
          <span class="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none"></span>

          <!-- Official WhatsApp Vector Icon -->
          <svg
            class="w-7 h-7 sm:w-8 sm:h-8 fill-current drop-shadow-sm"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25.7-.99 1.28-1.74 1.44-.5.11-1.15.2-3.32-.7-2.77-1.15-4.56-3.96-4.7-4.15-.14-.19-1.13-1.5-1.13-2.87 0-1.36.71-2.03.97-2.31.25-.28.56-.35.75-.35.19 0 .37 0 .53.01.17.01.4-.07.63.48.23.56.79 1.93.86 2.07.07.14.12.31.02.5-.09.19-.14.31-.28.47-.14.16-.3.37-.42.49-.14.14-.29.29-.12.57.16.28.72 1.19 1.55 1.93 1.07.95 1.97 1.25 2.25 1.39.28.14.44.12.6-.07.16-.19.7-.81.89-1.09.19-.28.37-.23.63-.14.25.09 1.63.77 1.91.91.28.14.47.21.53.33.07.11.07.67-.18 1.37z"
            />
          </svg>
        </div>
      </a>
    </aside>
  `
})
export class FloatingWhatsappComponent {
  readonly content = inject(ContentService);
}
