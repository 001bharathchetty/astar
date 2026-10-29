import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-commercial-showcase',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="relative w-full h-full flex flex-col items-center justify-between p-6 sm:p-8 select-none">
      
      <!-- Top Eyebrow in Showcase -->
      <div class="w-full flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-stone-700 dark:text-stone-300 border-b border-stone-200/80 dark:border-stone-800 pb-3">
        <span class="flex items-center gap-1.5 font-bold">
          <span class="w-2 h-2 rounded-full bg-[#ea1c24] animate-pulse"></span>
          <span>Commercial Scope Matrix</span>
        </span>
        <span>03 Core Sectors</span>
      </div>

      <!-- Center Infographic SVG Diagram -->
      <div class="my-6 relative w-full aspect-square max-w-[280px] sm:max-w-[320px] flex items-center justify-center">
        
        <!-- Connecting Circuit Vectors (SVG) -->
        <svg class="absolute inset-0 w-full h-full pointer-events-none stroke-stone-300 dark:stroke-stone-700" viewBox="0 0 320 320" fill="none">
          <!-- Outer orbital boundary -->
          <circle cx="160" cy="160" r="115" stroke-dasharray="4 4" stroke-width="1.2" class="opacity-60" />
          
          <!-- Radial connector lines from center (160, 160) to nodes -->
          <!-- Top: (160, 48) -->
          <line x1="160" y1="160" x2="160" y2="48" stroke-width="2" class="stroke-[#ea1c24]/50" />
          <!-- Bottom Left: (65, 235) -->
          <line x1="160" y1="160" x2="65" y2="235" stroke-width="2" class="stroke-stone-400 dark:stroke-stone-600" />
          <!-- Bottom Right: (255, 235) -->
          <line x1="160" y1="160" x2="255" y2="235" stroke-width="2" class="stroke-stone-400 dark:stroke-stone-600" />
          
          <!-- Energy pulse circle -->
          <circle cx="160" cy="160" r="42" class="fill-[#ea1c24]/10 dark:fill-[#ea1c24]/15 animate-ping opacity-30" />
        </svg>

        <!-- Center Brand Hub Node (Red, Black, White) -->
        <div class="relative z-10 w-24 h-24 rounded-2xl bg-black text-white border-2 border-[#ea1c24] shadow-2xl flex flex-col items-center justify-center p-2 text-center group cursor-default">
          <mat-icon class="!w-6 !h-6 !text-2xl text-[#ea1c24] leading-none mb-1">bolt</mat-icon>
          <span class="font-heading font-black text-xs uppercase tracking-tighter leading-tight text-white">ASTAR</span>
          <span class="text-[8.5px] font-heading font-bold text-[#ea1c24] tracking-[0.16em] uppercase leading-none mt-0.5">ELECTRICALS</span>
        </div>

        <!-- Node 1: Top (Workplaces) -->
        <div class="absolute top-2 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
          <div class="px-3 py-1.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-md text-center hover:scale-105 transition-transform">
            <span class="text-[10px] font-mono font-bold text-[#ea1c24] block">01 / WORKPLACES</span>
            <span class="text-xs font-semibold text-stone-900 dark:text-stone-100 font-heading">Offices & Tech</span>
          </div>
        </div>

        <!-- Node 2: Bottom-Left (Retail) -->
        <div class="absolute bottom-4 left-0 z-20 flex flex-col items-center">
          <div class="px-3 py-1.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-md text-center hover:scale-105 transition-transform">
            <span class="text-[10px] font-mono font-bold text-stone-700 dark:text-stone-300 block">02 / RETAIL</span>
            <span class="text-xs font-semibold text-stone-900 dark:text-stone-100 font-heading">Showrooms</span>
          </div>
        </div>

        <!-- Node 3: Bottom-Right (Facilities) -->
        <div class="absolute bottom-4 right-0 z-20 flex flex-col items-center">
          <div class="px-3 py-1.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-md text-center hover:scale-105 transition-transform">
            <span class="text-[10px] font-mono font-bold text-stone-700 dark:text-stone-300 block">03 / FACILITIES</span>
            <span class="text-xs font-semibold text-stone-900 dark:text-stone-100 font-heading">Developments</span>
          </div>
        </div>

      </div>

      <!-- Bottom Caption Footer -->
      <div class="w-full pt-3 border-t border-stone-200/80 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-700 dark:text-stone-300 font-mono">
        <span class="font-bold text-stone-900 dark:text-stone-100">Base Markets:</span>
        <span class="text-[#ea1c24] font-semibold">Bengaluru · Chennai · Hyderabad</span>
      </div>

    </div>
  `
})
export class CommercialShowcaseComponent {}
