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

        <!-- Center Brand Hub Node (Clean Light / White Background, No Dark Box) -->
        <div class="relative z-10 w-24 h-24 rounded-2xl bg-white dark:bg-stone-900 border-2 border-[#ea1c24] shadow-xl flex flex-col items-center justify-center p-2 text-center group cursor-default">
          <svg class="w-7 h-7 mb-1" viewBox="0 0 1254 1254" fill="none" aria-hidden="true">
            <path d="M 300 163 L 374 163 L 476 462 L 382 462 L 366 409 L 227 409 L 193 462 L 100 462 Z M 337 250 L 353 350 L 264 350 Z" class="fill-[#0F172A] dark:fill-white" fill-rule="evenodd" />
            <path d="M 808 37 L 364 736 L 657 736 L 474 1230 L 1002 577 L 691 577 Z" fill="#EA1C24" />
            <path d="M 830 874 L 1069 874 L 1050 942 L 908 942 L 896 986 L 1014 986 L 996 1050 L 878 1050 L 866 1094 L 1022 1094 L 1004 1159 L 748 1159 Z" class="fill-[#0F172A] dark:fill-white" />
          </svg>
          <span class="font-brand font-black text-xs sm:text-sm tracking-tight leading-tight text-stone-950 dark:text-white">A<span class="text-[#ea1c24]">STAR</span></span>
          <span class="text-[8px] font-brand font-bold text-stone-800 dark:text-stone-200 tracking-[0.16em] uppercase leading-none mt-0.5">ELECTRICALS</span>
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
