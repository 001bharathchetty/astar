# Modern Angular Frontend Application Guidelines & Standards

> **Stack Specification**: Angular 22+, Angular Material 22+, Tailwind CSS 4+, Angular SSR/SSG Prerendering, Netlify Serverless Static Hosting, Netlify Forms, TypeScript Strict, Dark/Light Theming, Strictly Angular Material UI Elements & Dialogs.

This document serves as the comprehensive engineering standard and blueprint for building enterprise-grade, high-performance, SEO-first Angular frontend applications. Use this specification to ensure architectural consistency, strict type safety, accessible design systems, and seamless deployment across projects.

---

## 1. Core Technology Stack & Version Matrix

| Technology | Minimum Version | Role & Description |
| :--- | :--- | :--- |
| **Angular** | `^22.0.0` | Latest Angular framework using Standalone Components, Signal-based reactivity, modern Control Flow (`@if`, `@for`, `@switch`, `@let`), and `inject()`. |
| **Angular Material** | `^22.0.0` | Official Material Design 3 component suite (`@angular/material`, `@angular/cdk`). All UI interactive components and modals MUST use this library. |
| **Tailwind CSS** | `^4.0.0` | Utility-first CSS framework for layout, responsive grid/flexbox, typography rhythm, animations, and dark-mode styling. |
| **Angular SSR / SSG** | `^22.0.0` | `@angular/ssr` configured for build-time static site prerendering (SSG) to achieve instantaneous First Contentful Paint (FCP) and optimal SEO. |
| **Hosting Platform** | Netlify | Global CDN hosting with edge caching, zero Node.js server maintenance in production, automated continuous deployment, and native Netlify Forms. |
| **TypeScript** | `^5.6.0` | Strict type checking (`strict: true`, `noImplicitAny: true`, `strictNullChecks: true`). |

---

## 2. Architectural Blueprint & Directory Structure

Organize the codebase following the clean modular **Core - Shared - Features** architecture:

```
src/
├── app/
│   ├── core/                          # Singleton services, global models, guards, interceptors
│   │   ├── services/
│   │   │   ├── theme.service.ts       # Signal-based Dark/Light theme manager & persistence
│   │   │   ├── seo.service.ts         # Meta tags, OpenGraph, Canonical, JSON-LD Schema.org
│   │   │   ├── netlify-form.service.ts# Form serialization & Netlify POST handler
│   │   │   └── data.service.ts        # Content repository & API client
│   │   └── models/                    # Global domain interfaces & types (Strict TS)
│   ├── shared/                        # Reusable dumb components, dialogs, pipes, directives
│   │   ├── components/
│   │   │   ├── navbar/                # Global navigation bar with MatToolbar & theme toggle
│   │   │   ├── footer/                # Standardized footer with links & social indicators
│   │   │   ├── section-header/        # Consistent section eyebrow, title & subtitle
│   │   │   └── stat-card/             # Metric highlight cards with MatCard & counters
│   │   └── dialogs/                   # Strictly Angular Material MatDialog implementations
│   │       ├── consultation-dialog/   # Inquiry & consultation modal with Netlify Form
│   │       └── service-detail-dialog/ # Drill-down detail modal for complex services
│   ├── features/                      # Route-level page components (lazy-loadable)
│   │   ├── home/                      # Landing page, hero, proof points, value proposition
│   │   ├── about/                     # About company, mission, vision, differentiators
│   │   ├── services/                  # Service catalogue & detail views
│   │   ├── industries/                # Sector-specific solutions
│   │   ├── how-we-work/               # Process roadmap & methodology
│   │   ├── leadership/                # Team profiles, track records & credentials
│   │   └── contact/                   # Contact information & direct Netlify form
│   ├── app.component.ts               # Root component (Navbar + RouterOutlet + Footer)
│   ├── app.routes.ts                  # Application route definitions with prerender targets
│   └── app.config.ts                  # Root application providers (Router, SSR, HTTP, Material)
├── assets/
│   ├── brand/                         # Extracted SVG/PNG logos, emblems, mark variants
│   ├── icons/                         # Custom SVG icons if not available in Material Symbols
│   └── og-image.png                   # 1200x630 Social card preview for Twitter/LinkedIn
├── favicon.ico                        # Multi-resolution favicon (.ico)
├── index.html                         # Base HTML template with pre-rendered hidden forms & SEO
├── styles.scss                        # Material theme definition + Tailwind imports
└── netlify.toml                       # Netlify deployment configuration, caching & redirects
```

---

## 3. UI Component & Styling Standards

### 3.1 Strict Angular Material UI Rule
- **Mandatory Usage**: All structural controls, buttons, cards, form elements, icons, dividers, chips, tooltips, dialogs, and snackbars **MUST** be official Angular Material components:
  - `MatToolbar` (`mat-toolbar`)
  - `MatButton` (`mat-button`, `mat-raised-button`, `mat-flat-button`, `mat-stroked-button`, `mat-icon-button`)
  - `MatCard` (`mat-card`, `mat-card-header`, `mat-card-title`, `mat-card-content`, `mat-card-actions`)
  - `MatIcon` (`mat-icon`) using Material Symbols Outlined
  - `MatFormField`, `MatLabel`, `MatInput`, `MatSelect`
  - `MatChips` (`mat-chip-set`, `mat-chip`)
  - `MatDivider` (`mat-divider`)
  - `MatDialog` (`MatDialogRef`, `MatDialogTitle`, `MatDialogContent`, `MatDialogActions`)
  - `MatSnackBar` for feedback notifications
  - `MatTooltip` for accessibility hints
  - `MatExpansionModule` (`mat-accordion`, `mat-expansion-panel`) for collapsible content

### 3.2 Tailwind CSS Synergy
- Do **NOT** reinvent buttons or input fields with raw Tailwind.
- Use Tailwind CSS exclusively for:
  - Responsive layouts: `container mx-auto px-4`, `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`
  - Flexbox alignment: `flex items-center justify-between`
  - Spacing & margins: `py-16`, `mt-6`, `space-y-4`
  - Background gradients & blurs: `bg-gradient-to-br from-slate-900 to-navy-950 backdrop-blur-md`
  - Typography scale: `text-4xl md:text-5xl font-extrabold tracking-tight`
  - Hover micro-interactions: `transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`

---

## 4. Modal & Dialog Standards (Strictly Angular Material)

> [!CAUTION]
> **Zero JavaScript or Native Browser Modals**: Never use `window.alert()`, `window.confirm()`, `window.prompt()`, Bootstrap modals, or bespoke JavaScript popup overlays.

All modals must be built using `@angular/material/dialog`:

```typescript
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-service-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="p-6 max-w-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl">
      <div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <h2 mat-dialog-title class="!m-0 text-2xl font-bold flex items-center gap-3">
          <mat-icon class="text-primary-600 dark:text-primary-400">{{ data.icon }}</mat-icon>
          {{ data.title }}
        </h2>
        <button mat-icon-button mat-dialog-close aria-label="Close dialog">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <mat-dialog-content class="!py-6 !px-0 text-slate-600 dark:text-slate-300 space-y-4">
        <p class="leading-relaxed text-base">{{ data.description }}</p>
        <div class="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl">
          <h4 class="font-semibold text-slate-900 dark:text-white mb-2">Scope of Coverage:</h4>
          <ul class="space-y-2">
            @for (item of data.points; track item) {
              <li class="flex items-start gap-2">
                <mat-icon class="text-emerald-500 !text-lg !w-5 !h-5 mt-0.5">check_circle</mat-icon>
                <span>{{ item }}</span>
              </li>
            }
          </ul>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions align="end" class="!px-0 !pt-4 border-t border-slate-200 dark:border-slate-800">
        <button mat-stroked-button mat-dialog-close>Close</button>
        <button mat-flat-button color="primary" (click)="onAction()">Get In Touch</button>
      </mat-dialog-actions>
    </div>
  `
})
export class ServiceDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ServiceDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  onAction(): void {
    this.dialogRef.close('action');
  }
}
```

Opening dialogs:
```typescript
const dialogRef = this.dialog.open(ServiceDialogComponent, {
  data: servicePayload,
  width: '640px',
  panelClass: 'custom-dialog-container',
  autoFocus: 'first-tabbable',
});
```

---

## 5. Dual-Theme Architecture (Light & Dark Mode)

### 5.1 Theme Service Implementation
Theme state must be managed with Angular Signals, persisted in `localStorage`, and synced with the user's OS preference (`prefers-color-scheme`).

```typescript
// src/app/core/services/theme.service.ts
import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type AppTheme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  readonly currentTheme = signal<AppTheme>('light');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('app-theme') as AppTheme | null;
      if (saved === 'dark' || saved === 'light') {
        this.currentTheme.set(saved);
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.currentTheme.set(prefersDark ? 'dark' : 'light');
      }

      effect(() => {
        const theme = this.currentTheme();
        const root = document.documentElement;
        if (theme === 'dark') {
          root.classList.add('dark');
          root.classList.remove('light');
        } else {
          root.classList.add('light');
          root.classList.remove('dark');
        }
        localStorage.setItem('app-theme', theme);
      });
    }
  }

  toggleTheme(): void {
    this.currentTheme.update(t => (t === 'light' ? 'dark' : 'light'));
  }
}
```

### 5.2 Color Tokens & Material Synergy
Define an elegant palette that works across both light and dark backgrounds:
- **Corporate Primary**: Navy `#0B2545` (Light mode text/accent) / `#60A5FA` or `#93C5FD` (Dark mode contrast)
- **Growth Accent**: Emerald Teal `#008060` / `#0D7A68` (Light) / `#10B981` or `#34D399` (Dark)
- **Surfaces**:
  - Light: `#FFFFFF` (Surface), `#F8FAFC` (Canvas), `#E2E8F0` (Border)
  - Dark: `#0B1120` (Canvas), `#1E293B` (Surface), `#334155` (Border)

---

## 6. Angular 22 Static Site Generation (SSG) & Pre-rendering Architecture

Netlify operates as a high-performance global edge CDN. Running a heavy dynamic Node.js server runtime for marketing and showcase webapps introduces unnecessary cold-start latency, server maintenance overhead, and lambda billing.

The enterprise standard for Angular web applications is **Build-Time Static Site Generation (SSG)** using `@angular/build:application`, `@angular/ssr`, and `@angular/platform-server`. Every route is prerendered at build time into complete, fully-rendered static HTML files (`dist/<project>/browser/<route>/index.html`) delivered via Netlify edge CDN cache with **0ms cold start**, **100% crawlability**, and instant client-side hydration with zero event drop.

### 6.1 Core Dependencies & Version Consistency
Install the official SSR and platform server packages matching your Angular version:
```bash
npm install @angular/ssr@^22.2.0 @angular/platform-server@^22.2.0
```
> [!IMPORTANT]
> **Strict Version Parity**: Keep all `@angular/*` packages pinned to the identical major and minor version (e.g. `^22.2.2`). Never mix major versions (e.g., Angular 19 and 22).

### 6.2 Route Manifest (`src/routes.txt`)
Maintain an explicit route manifest file listing all canonical static routes to guarantee pre-rendering at build time:
```
/
/about
/services
/industries
/how-we-work
/leadership
/contact
```

### 6.2.1 Route Definitions with Explicit Titles (`src/app/app.routes.ts`)
Always declare descriptive, distinctive `title` properties on every route definition in `src/app/app.routes.ts`.

> [!IMPORTANT]
> **Why Explicit Route Titles are Mandatory**:
> 1. **Social Link Previews**: Link crawlers and scrapers (WhatsApp, LinkedIn, Twitter/X, Facebook, iMessage) extract the page title and OpenGraph tags from the prerendered HTML. Missing or generic route titles result in identical preview cards across different URLs.
> 2. **Browser Tab Navigation**: Angular's router built-in `TitleStrategy` immediately updates the document title upon route transition without waiting for component lifecycle hooks.
> 3. **SSG Pre-rendering**: Angular SSR bakes the route's `title` into the `<title>` and `<meta property="og:title">` elements of `dist/<project>/browser/<route>/index.html`.

Example standard route configuration:
```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home-page.component').then(m => m.HomePageComponent),
    title: 'Brand | Tagline — Core Proposition'
  },
  {
    path: 'what-we-do',
    loadComponent: () => import('./pages/what-we-do/what-we-do-page.component').then(m => m.WhatWeDoPageComponent),
    title: 'What We Do | Products & Solutions | Brand'
  },
  {
    path: 'how-we-work',
    loadComponent: () => import('./pages/how-we-work/how-we-work-page.component').then(m => m.HowWeWorkPageComponent),
    title: 'How We Work | Methodology & Process | Brand'
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about-page.component').then(m => m.AboutPageComponent),
    title: 'About Us | Vision & Identity | Brand'
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact-page.component').then(m => m.ContactPageComponent),
    title: 'Contact Us | Start a Conversation | Brand'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
```

### 6.3 Server Bootstrap Entry Point (`src/main.server.ts`)
The server entry point initializes the application during the build-time prerendering phase.

> [!CAUTION]
> **Critical Angular 22 Requirement (`BootstrapContext`)**:  
> In Angular 22, the server bootstrap function receives an optional `context: BootstrapContext` argument containing `{ platformRef }` from the route extractor. You **MUST** accept this `context` parameter and forward it as the 3rd argument to `bootstrapApplication(App, config, context)`.  
> Omitting `context` results in `Error: NG0401 Missing Platform` during prerender route extraction.

```typescript
// src/main.server.ts
import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = (context?: BootstrapContext) => bootstrapApplication(AppComponent, config, context);

export default bootstrap;
```

### 6.4 Server Application Configuration (`src/app/app.config.server.ts`)
Provide server-side rendering capabilities by merging the base application config with `provideServerRendering()`:
```typescript
// src/app/app.config.server.ts
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
```

### 6.5 Client-Side Hydration with Event Replay (`src/app/app.config.ts`)
To achieve instantaneous interactivity without visual flickering or lost user interactions while JavaScript bundles are downloading, enable Angular's client hydration with event replay:

```typescript
// src/app/app.config.ts
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      })
    ),
    // Enables client hydration and records user events before hydration to replay seamlessly
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
  ],
};
```

### 6.6 `angular.json` Build Target Configuration
Configure the `@angular/build:application` architect target with `server`, `prerender`, and `ssr: false`:
```json
"architect": {
  "build": {
    "builder": "@angular/build:application",
    "options": {
      "browser": "src/main.ts",
      "server": "src/main.server.ts",
      "prerender": {
        "discoverRoutes": true,
        "routesFile": "src/routes.txt"
      },
      "ssr": false,
      "tsConfig": "tsconfig.app.json",
      "assets": [
        {
          "glob": "**/*",
          "input": "public"
        }
      ],
      "styles": ["src/styles.scss"]
    }
  }
}
```
- `"server": "src/main.server.ts"`: Points the build system to the server bootstrap entry.
- `"prerender"`: Enables build-time SSG across all routes found in `routesFile` as well as unparameterized routes in the router.
- `"ssr": false`: Prevents outputting a runtime Node server bundle, ensuring pure static output for Netlify edge CDN hosting.

### 6.7 Pre-rendering Output Verification Checklist
After executing `npm run build`, verify the generated output in `dist/<project>/browser`:
1. **Route Subdirectories**: Verify that each route has its own dedicated directory containing `index.html` (e.g., `dist/<project>/browser/about/index.html`, `contact/index.html`, etc.).
2. **Pre-rendered Markup Inside `<app-root>`**: Inspect any generated `index.html` file; ensure `<app-root ng-version="22.x.x" ng-server-context="ssg">` contains full DOM markup, headings, paragraphs, and navigation elements.
3. **Route-Specific Title & Meta Tags**: Verify that the `<head>` of each route file contains the exact `<title>`, `<meta name="description">`, canonical `<link>`, and OpenGraph tags for that route.
4. **Hydration Scripts Present**: Verify `<script id="ng-state">` (serialized transfer state) and `window.__jsaction_bootstrap` (event dispatch contract) are present.

### 6.8 Netlify Hosting Configuration (`netlify.toml`)
Configure Netlify to publish the static browser directory, route SPA fallbacks, and serve secure headers:
```toml
[build]
  command = "npm run build"
  publish = "dist/<project-name>/browser"

[build.environment]
  NODE_VERSION = "22"
  NPM_FLAGS = "--legacy-peer-deps"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"

[[headers]]
  for = "/robots.txt"
  [headers.values]
    Content-Type = "text/plain; charset=utf-8"

[[headers]]
  for = "/sitemap.xml"
  [headers.values]
    Content-Type = "application/xml; charset=utf-8"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### 6.8.1 CI Dependency Resolution & Silent Deploy Failures (`.npmrc` & `NPM_FLAGS`)

> [!CAUTION]
> **The Silent Deploy Failure Trap (`npm error code ERESOLVE`)**:  
> Netlify runs `npm ci` on every push to `main`. In modern Angular 22 projects with `@angular/ssr` and `@angular/platform-server`, ecosystem patch versions frequently create minor peer dependency conflicts (e.g. `@angular/platform-server@22.2.3` requiring `@angular/common@22.2.3` while `@angular/common` in `package.json` is on `^22.2.2`).
>
> When this occurs, `npm ci` crashes with `npm error code ERESOLVE could not resolve peer dependency`.
>
> **The Critical Danger**: When `npm ci` fails, Netlify **cancels the deployment and silently continues serving the last successful build** (e.g., an outdated SPA version). Edge servers continue serving the stale build where all route URLs fall back to a single generic `index.html`. Developers assume their code was deployed, while live users and social scrapers receive outdated pages.
>
> **Mandatory Prevention Steps**:
> 1. **Project Root `.npmrc`**: Always commit a `.npmrc` file in the project root:
>    ```ini
>    legacy-peer-deps=true
>    ```
> 2. **Netlify Build Flags**: Include `NPM_FLAGS = "--legacy-peer-deps"` and `NODE_VERSION = "22"` under `[build.environment]` in `netlify.toml`.
> 3. **Local CI Verification**: Run `npm ci --dry-run` locally before pushing to confirm the lockfile installs cleanly without peer dependency blocking.

---

## 7. Netlify Forms Integration

Netlify detects HTML forms by scanning static HTML files at build time. Since Angular renders clientside, follow this two-step architecture:

### 7.1 Pre-rendered Hidden Form in `index.html`
Place a hidden HTML form inside `<body class="...">` in `src/index.html` so Netlify's deployment bot discovers all field names:

```html
<!-- Netlify Form Detection (Static Pre-render) -->
<form name="contact" netlify netlify-honeypot="bot-field" hidden>
  <input type="text" name="bot-field" />
  <input type="text" name="name" />
  <input type="email" name="email" />
  <input type="tel" name="phone" />
  <input type="text" name="company" />
  <input type="text" name="service" />
  <textarea name="message"></textarea>
</form>
```

### 7.2 Angular Reactive Form Submission
Submit form data via `HttpClient` encoded as `application/x-www-form-urlencoded`:

```typescript
// src/app/core/services/netlify-form.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NetlifyFormService {
  private readonly http = inject(HttpClient);

  submitForm(formName: string, data: Record<string, string>): Observable<string> {
    const payload = new URLSearchParams();
    payload.set('form-name', formName);
    for (const [key, value] of Object.entries(data)) {
      payload.set(key, value);
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post('/', payload.toString(), {
      headers,
      responseType: 'text',
    });
  }
}
```

Display confirmation via `MatDialog` (Modal-First policy, zero toasts for form submissions):
```typescript
this.netlifyForm.submitForm('contact', this.contactForm.getRawValue()).subscribe({
  next: () => {
    this.dialog.open(FeedbackDialogComponent, {
      data: {
        title: 'Inquiry Received',
        message: 'Thank you! Your request has been received. Our senior advisory team will contact you shortly.',
        isError: false
      },
      width: '460px',
      maxWidth: '92vw',
      panelClass: 'custom-dialog-container'
    });
    this.contactForm.reset();
  }
});
```

---

## 8. SEO, OpenGraph & Social Cards (WhatsApp, LinkedIn, X / Twitter)

To ensure link previews on **WhatsApp**, **LinkedIn**, and **Twitter / X** render official brand logos and summary cards flawlessly across mobile and desktop clients, follow these strict multi-platform standards:

### 8.1 Multi-Platform Crawler Compatibility Matrix

| Platform | Supported Aspect Ratios | File Size Limit | Key Required Tags | Notes / Crawler Behavior |
| :--- | :--- | :--- | :--- | :--- |
| **WhatsApp** | `1.91:1` (Large) & `1:1` (Thumbnail) | **Strictly < 300 KB** (Ideal < 150 KB) | `og:image`, `og:image:secure_url`, `og:image:type`, `og:title`, `og:description` | WhatsApp crawler (`WhatsApp/2.x`) rejects images > 300KB. In chat bubbles, it auto-crops to a center `1:1` square; critical logo content must live in the center safe zone. |
| **LinkedIn** | `1.91:1` (`1200x627` or `1200x630`) | Max 5 MB | `og:image`, `og:title`, `og:description`, `og:url` | LinkedIn Post Inspector caches heavily. Requires absolute HTTPS URLs and non-empty description. |
| **Twitter / X** | `1.91:1` (Large) or `1:1` (Summary) | Max 5 MB | `twitter:card="summary_large_image"`, `twitter:image`, `twitter:title`, `twitter:description` | Renders edge-to-edge card below tweet. Falls back to `og:image` if `twitter:image` is omitted. |
| **Facebook / Meta** | `1.91:1` (`1200x630`) | Max 8 MB | `og:image`, `og:image:width`, `og:image:height`, `og:type` | Requires explicit width/height tags for instantaneous first-share rendering without cache delays. |
| **Slack / iMessage**| `1.91:1` or `1:1` | Max 2 MB | `og:image`, `og:title`, `og:description` | Reads standard OpenGraph protocol; displays rich inline preview cards. |

### 8.2 Safe Area Architecture for Universal Preview Rendering

A standard OpenGraph image is designed at `1200 x 630` pixels (`1.91:1` aspect ratio). However, because messaging apps like WhatsApp frequently crop the card to a **`1:1` square** (`630 x 630`) in chat lists and notifications:
- **Total Canvas**: `1200 x 630` px.
- **Center Safe Zone**: The horizontal center `630 x 630` px area (`x = 285` to `915`, `y = 0` to `630`).
- **Placement Rule**: Keep the entire core brand emblem, primary company wordmark, and tagline strictly within this center square. The outer left and right 285px margins must remain clean background canvas so no typography is clipped during square cropping.

### 8.3 Dual-Format Asset Provisioning

Maintain two primary formats in `public/assets/brand/`:
1. `og-image.png` (`1200 x 630`, RGB/RGBA, optimized PNG, ~139 KB): Default for high-DPI displays on LinkedIn, Twitter, and Facebook.
2. `og-image.jpg` (`1200 x 630`, 92% quality progressive JPEG, ~47 KB): Lightweight fallback for bandwidth-constrained messaging clients.
3. `og-square.png` (`800 x 800`, ~145 KB): Dedicated 1:1 square preview for platforms that request square metadata.

### 8.4 Required `<head>` Tags in `src/index.html`
```html
<head>
  <meta charset="utf-8" />
  <title>TreGrow Corporate Services | Strategic Financial Advisory</title>
  <base href="/" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="Specialised guidance in corporate treasury, debt syndication, trade finance, FX risk management, and fractional CFO stewardship." />
  
  <!-- Canonical URL (Must match live production deployment) -->
  <link rel="canonical" href="https://tregrow.netlify.app/" />

  <!-- Favicons and Touch Icons -->
  <link rel="icon" type="image/x-icon" href="favicon.ico" />
  <link rel="icon" type="image/png" sizes="32x32" href="assets/brand/favicon-32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="assets/brand/favicon-16.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="assets/brand/apple-touch-icon.png" />
  <meta name="theme-color" content="#0B2545" />

  <!-- OpenGraph Protocol (WhatsApp, LinkedIn, Facebook, Slack) -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://tregrow.netlify.app/" />
  <meta property="og:site_name" content="TreGrow Corporate Services" />
  <meta property="og:title" content="TreGrow Corporate Services | Strategic Financial Advisory" />
  <meta property="og:description" content="Specialised guidance in corporate treasury, debt syndication, trade finance, FX risk management, and fractional CFO stewardship. Rooted in over 20 years of real corporate finance leadership." />
  <meta property="og:image" content="https://tregrow.netlify.app/assets/brand/og-image.png" />
  <meta property="og:image:secure_url" content="https://tregrow.netlify.app/assets/brand/og-image.png" />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="TreGrow Corporate Services Logo and Strategic Advisory Philosophy" />
  <meta property="og:locale" content="en_IN" />

  <!-- Twitter / X Cards -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="https://tregrow.netlify.app/" />
  <meta name="twitter:title" content="TreGrow Corporate Services | Strategic Financial Advisory" />
  <meta name="twitter:description" content="Corporate treasury, debt syndication, trade finance, FX management, and fractional CFO leadership for growing enterprises." />
  <meta name="twitter:image" content="https://tregrow.netlify.app/assets/brand/og-image.png" />
  <meta name="twitter:image:alt" content="TreGrow Corporate Services Logo" />

  <!-- Schema.org JSON-LD Structured Data for Financial Service -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "TreGrow Corporate Services",
    "alternateName": "TreGrow",
    "url": "https://tregrow.netlify.app/",
    "logo": "https://tregrow.netlify.app/assets/brand/logo.png",
    "image": "https://tregrow.netlify.app/assets/brand/og-image.png",
    "description": "Professional financial advisory firm providing specialised guidance in corporate treasury, debt syndication, trade finance, FX management, and fractional CFO services.",
    "telephone": "+919321631354",
    "email": "info@tregrow.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mumbai",
      "addressCountry": "IN"
    }
  }
  </script>
</head>
```

### 8.4.1 Single OpenGraph Banner Policy (Never Multiple or Conflicting `og:image` Tags)

> [!WARNING]
> **Avoid Conflicting OpenGraph Image Tags**:  
> Never declare multiple `<meta property="og:image">` tags (e.g., declaring one 1200×630 landscape banner and one 1200×1200 square logo) or legacy `<link rel="image_src">`.
>
> **Why Multiple Tags Break Chat Previews**:  
> Messaging platform scrapers (WhatsApp, LinkedIn, Slack, iMessage) parse all declared image tags. If a secondary square image is present, crawlers often pick the square image and **downgrade the entire link preview from an expansive full-width rich banner into a tiny, cramped square thumbnail on the left**.
>
> **The Golden Rule**:
> 1. Declare **exactly one** high-resolution `1200 x 630` px landscape banner (`og:image` and `og:image:secure_url`).
> 2. Always declare explicit dimensions, MIME type, and alt text:
>    ```html
>    <meta property="og:image" content="https://<domain>/assets/brand/og-image.png" />
>    <meta property="og:image:secure_url" content="https://<domain>/assets/brand/og-image.png" />
>    <meta property="og:image:type" content="image/png" />
>    <meta property="og:image:width" content="1200" />
>    <meta property="og:image:height" content="630" />
>    <meta property="og:image:alt" content="Page Title — Brand" />
>    ```
> 3. Always pair with `<meta name="twitter:card" content="summary_large_image">`.

### 8.5 Dynamic Route Updates via `SeoService`
Page-level components (e.g. `/treasury-services`, `/fractional-cfo`) MUST call `SeoService.updateMeta()` in `ngOnInit`:
```typescript
this.seoService.updateMeta({
  title: 'Corporate Treasury Advisory',
  description: 'Trade financing, debt syndication, working capital optimization and FX risk strategy.',
  url: '/treasury-services'
});
```
Because Angular SSG pre-renders every route at build time into static HTML (`dist/<project>/browser/<route>/index.html`), social media crawlers receive these exact meta tags on initial request without executing JavaScript.

### 8.6 Social Platform Cache Invalidation & Live Edge Verification

> [!TIP]
> **Aggressive Platform Caching**:  
> Social chat platforms (especially WhatsApp) aggressively cache preview cards by exact URL for days or weeks. If a link was shared before metadata or SSG prerendering was deployed, WhatsApp will continue displaying its cached preview.
>
> **Verification Protocol**:
> 1. **Live Edge Verification via `curl`**: Always check what the live CDN edge is actively returning to crawlers:
>    ```bash
>    curl -sL https://<domain>/<route> | grep -E '<title>|og:title|og:description|og:image'
>    ```
> 2. **Cache-Busting Query Parameter**: During testing, append a query parameter (e.g. `https://<domain>/<route>?v=1`) to force WhatsApp and Slack to fetch a completely fresh copy of the HTML.
> 3. **Official Invalidation Tools**:
>    - **LinkedIn**: [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) (immediately purges and re-scrapes preview cache).
>    - **Facebook / Meta**: [Meta Sharing Debugger](https://developers.facebook.com/tools/debug/) (click "Scrape Again" to clear WhatsApp/Facebook CDN cache).
>    - **Twitter / X**: [Card Validator / Tweet Composer preview](https://cards-dev.twitter.com/validator).

### 8.7 Search Engine Infrastructure: Robots.txt & Sitemap.xml
Every production webapp must ship with an official `robots.txt` and canonical XML `sitemap.xml` placed in the `public/` directory (automatically bundled to the root of `dist/<project>/browser/` during build):

#### 1. `public/robots.txt`
```txt
User-agent: *
Allow: /

Sitemap: https://<production-domain>/sitemap.xml
```

#### 2. `public/sitemap.xml`
Generate a valid XML sitemap indexing all canonical prerendered routes with explicit priority and change frequencies:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://<production-domain>/</loc>
    <lastmod>2026-10-16</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://<production-domain>/what-we-do</loc>
    <lastmod>2026-10-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://<production-domain>/how-we-work</loc>
    <lastmod>2026-10-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://<production-domain>/about</loc>
    <lastmod>2026-10-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://<production-domain>/contact</loc>
    <lastmod>2026-10-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

### 8.8 Localhost & SSR URL Resolution Guard in `SeoService`
> [!WARNING]
> **Never Leak Localhost into Canonical or Social Meta Tags**:  
> In local development and during build-time SSR passes, `window.location.origin` may be `http://localhost:3000`, `http://localhost:4200`, or `undefined`. If your `SeoService` uses `window.location.origin` without checking, social crawlers or prerendered static HTML files will inadvertently embed localhost URLs!
>
> `SeoService` must filter out localhost/127.0.0.1 and always fall back to the production canonical domain:

```typescript
// src/app/core/services/seo.service.ts
import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface SeoConfig {
  title: string;
  description: string;
  url?: string;
  image?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly document = inject(DOCUMENT);

  readonly productionOrigin = 'https://<production-domain>';
  readonly defaultOgImage = `${this.productionOrigin}/images/og-preview.jpg`;

  get siteBaseUrl(): string {
    try {
      if (typeof window !== 'undefined' && window.location && window.location.origin) {
        const origin = window.location.origin;
        // Never allow localhost or test runner origins into canonical/social meta
        if (!origin.includes('localhost') && !origin.includes('127.0.0.1')) {
          return origin;
        }
      }
    } catch {
      // Fallback during SSR execution
    }
    return this.productionOrigin;
  }

  setSeoData(config: SeoConfig): void {
    const fullTitle = config.title.includes('Brand') ? config.title : `${config.title} — Brand`;
    this.titleService.setTitle(fullTitle);

    const baseUrl = this.siteBaseUrl;
    const resolvedUrl = config.url
      ? (config.url.startsWith('http') ? config.url : `${baseUrl}${config.url.startsWith('/') ? '' : '/'}${config.url}`)
      : baseUrl;

    const resolvedImage = config.image
      ? (config.image.startsWith('http') ? config.image : `${baseUrl}${config.image.startsWith('/') ? '' : '/'}${config.image}`)
      : this.defaultOgImage;

    // Standard HTML Meta
    this.metaService.updateTag({ name: 'description', content: config.description });

    // OpenGraph Protocol
    this.metaService.updateTag({ property: 'og:title', content: fullTitle });
    this.metaService.updateTag({ property: 'og:description', content: config.description });
    this.metaService.updateTag({ property: 'og:url', content: resolvedUrl });
    this.metaService.updateTag({ property: 'og:image', content: resolvedImage });
    this.metaService.updateTag({ property: 'og:image:secure_url', content: resolvedImage });

    // Twitter / X Cards
    this.metaService.updateTag({ name: 'twitter:title', content: fullTitle });
    this.metaService.updateTag({ name: 'twitter:description', content: config.description });
    this.metaService.updateTag({ name: 'twitter:image', content: resolvedImage });

    // Canonical link tag
    let canonical = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', resolvedUrl);
  }
}
```

---

## 9. TypeScript Strict Configuration

Maintain zero tolerance for implicit any and loose typing in `tsconfig.json`:

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "outDir": "./dist/out-tsc",
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "moduleResolution": "bundler",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022"
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}
```

---

## 10. New Project Kickoff Checklist

When spinning up a new Angular project adhering to this specification:
1. `npx -y @angular/cli@22 new <project-name> --style=scss --ssr=true --routing=true --strict=true`
2. `npm install @angular/material@22 @angular/cdk@22 tailwindcss @tailwindcss/postcss postcss`
3. `npm install @angular/ssr@^22.2.0 @angular/platform-server@^22.2.0` (ensure all `@angular/*` packages match version).
4. Configure `main.server.ts` with `(context?: BootstrapContext) => bootstrapApplication(App, config, context)` to prevent `NG0401`.
5. Configure `app.config.server.ts` with `provideServerRendering()` and `app.config.ts` with `provideClientHydration(withEventReplay())`.
6. Configure `ThemeService` with Signals and `prefers-color-scheme` synchronization.
7. Extract client logo into `assets/brand/logo.png`, `emblem.png`, `favicon.ico`, and `og-image.png` (1200x630).
8. Set up `index.html` with pre-rendered Netlify form `<form name="..." netlify hidden>` and OpenGraph tags.
9. Create `NetlifyFormService` for URL-encoded submissions with `MatSnackBar` feedback.
10. Build all interactive overlays using `MatDialog` (no native alerts or browser dialogs).
11. Add static routes to `src/routes.txt` and configure `"server"`, `"prerender"`, `"ssr": false` in `angular.json`.
12. Create `public/robots.txt` and `public/sitemap.xml` with canonical routes.
13. Add `netlify.toml` with `[build.environment] NODE_VERSION = "22"`, `NPM_FLAGS = "--legacy-peer-deps"`, redirect rules, caching, and MIME type headers for `robots.txt` and `sitemap.xml`.
14. Add `.npmrc` in project root with `legacy-peer-deps=true` to prevent silent deployment failures during Netlify `npm ci`.
15. Implement `SeoService` with production origin fallback for localhost and SSR passes, explicit `1200x630` banner dimensions, and single `og:image` policy.
16. Verify build and static route generation with `npm run build` (confirm `Prerendered X static routes` and check `dist/<project>/browser/<route>/index.html`).
17. Ensure unit tests pass with `npm test -- --watch=false`.

---

## 11. Mandatory Package Version Tracking & Footer Display

> [!IMPORTANT]
> **Zero-Exception Rule**: For every single change, feature, and update to the application, the `version` field in `package.json` MUST be incremented, and this version MUST be displayed clearly in the application footer.

### 11.1 Incrementing `package.json`
Whenever code changes, releases, or hotfixes occur, bump the version using semantic versioning (`major.minor.patch`):
```json
{
  "name": "tregrow-app",
  "version": "1.0.1",
  ...
}
```

### 11.2 Importing Version via `resolveJsonModule`
Ensure `tsconfig.json` has `"resolveJsonModule": true`. In a dedicated service or directly in the footer component:

```typescript
// src/app/core/services/app-version.service.ts
import { Injectable } from '@angular/core';
import packageInfo from '../../../../package.json';

@Injectable({ providedIn: 'root' })
export class AppVersionService {
  readonly version = packageInfo.version;
}
```

### 11.3 Footer Rendering
Display the version badge in the global `FooterComponent`:
```html
<div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
  <span>TreGrow Corporate Services</span>
  <span>•</span>
  <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
    v{{ appVersion }}
  </span>
</div>
```

---

## 12. Sass Compiler Compatibility (`NG_BUILD_SASS_EMBEDDED`)

When building on macOS versions prior to Sonoma (e.g., Monterey / Ventura) or in custom CI environments, the native Dart VM binary in `sass-embedded` may fail with `Current Mac OS X version is lower than minimum supported version`.

To ensure 100% cross-platform compatibility without hanging or crashing, configure `NG_BUILD_SASS_EMBEDDED=false` in all `npm` scripts:

```json
"scripts": {
  "start": "NG_BUILD_SASS_EMBEDDED=false ng serve",
  "build": "NG_BUILD_SASS_EMBEDDED=false ng build",
  "watch": "NG_BUILD_SASS_EMBEDDED=false ng build --watch --configuration development"
}
```
This forces Angular CLI to use the pure-JS Dart Sass async compiler (`sass.initAsyncCompiler()`), guaranteeing reliable builds across all operating systems.

---

## 13. Mobile & Tablet Responsiveness Standards

### 13.1 Breakpoint Hierarchy
Modern Angular applications must be designed mobile-first and tested rigorously across standard device viewports:

| Device Category | Viewport Width | Key Tailwind Breakpoint | UI Layout Strategy |
| :--- | :--- | :--- | :--- |
| **Mobile Portrait** | `320px – 480px` | Default (no prefix) | Single-column layouts, stacked cards, full-width CTA buttons, sticky top navbar with hamburger drawer. |
| **Mobile Landscape / Small Tablet** | `481px – 767px` | `sm:` | 2-column metric cards, adjusted horizontal padding (`px-4 sm:px-6`). |
| **Tablet Portrait (iPad / Android Tab)** | `768px – 1023px` | `md:` | 2 to 3 columns max. Navigation drawer remains collapsed for multi-item menus (>5 items). |
| **Tablet Landscape / Small Laptop** | `1024px – 1279px` | `lg:` | 3 to 4 columns. Header navigation can expand ONLY if item count + logo fits without wrapping. |
| **Desktop & Large Displays** | `1280px+` | `xl:` & `2xl:` | Full multi-column grids, horizontal process pipelines, side-by-side executive profiles. |

### 13.2 Defensive Image Sizing (Preventing Unstyled Image Explosion)
- Never rely solely on utility classes (`class="h-12 w-auto"`) for critical brand images and logos. If CSS hydration is delayed or disabled, the browser displays the image's raw dimensions (often 1000px+), breaking the entire page layout.
- **Mandatory Practice**: Always supply explicit inline height and object-fit constraints on `<img>` tags:
  ```html
  <img
    src="assets/brand/logo.png"
    alt="Company Logo"
    height="48"
    style="height: 48px; max-height: 48px; max-width: 220px; width: auto; object-fit: contain;"
    class="h-10 sm:h-12 w-auto object-contain" />
  ```

### 13.3 Navigation Collapse Rules for Multi-Page Apps
- If the navbar contains more than 5 route links, do **NOT** expand at `lg:` (1024px).
- A 1024px tablet in portrait or narrow window cannot fit 8 links + logo + CTA buttons without wrapping.
- **Rule**: Set desktop navigation to `hidden xl:flex` and hamburger button to `xl:!hidden`. This ensures iPad and tablet users always receive the touch-friendly mobile drawer menu.

### 13.4 Touch Targets & Interactive Elements
- In accordance with WCAG 2.2 and Material Design 3 guidelines:
  - All interactive buttons, icon buttons, menu links, and form fields must maintain a minimum touch target area of **48 × 48 px**.
  - In mobile drawers, navigation links must have generous vertical padding (`py-3 sm:py-3.5`) to prevent accidental adjacent taps.

### 13.5 Responsive Modals & Dialogs (`MatDialog`)
- When opening Material Dialogs (`@angular/material/dialog`), always enforce responsive sizing:
  ```typescript
  this.dialog.open(MyDialogComponent, {
    width: '560px',
    maxWidth: '95vw',
    maxHeight: '90vh',
    panelClass: 'custom-dialog-container'
  });
  ```
- Dialog action bars on mobile must stack or provide full-width action buttons for thumb accessibility:
  ```html
  <mat-dialog-actions class="flex flex-col-reverse sm:flex-row justify-end gap-2">
  ```

---

## 14. Tailwind CSS v4 & PostCSS Setup in Angular

Per official Tailwind CSS documentation for Angular:
1. Install packages: `tailwindcss`, `@tailwindcss/postcss`, `postcss`.
2. Create `.postcssrc.json` in the project root:
   ```json
   {
     "plugins": {
       "@tailwindcss/postcss": {}
     }
   }
   ```
3. Separate Sass and Tailwind into dedicated stylesheets in `angular.json`:
   ```json
   "styles": [
     "src/styles.scss",
     "src/styles.css"
   ]
   ```
   - `src/styles.scss`: Contains Angular Material M3 theme (`@use '@angular/material' as mat;`).
   - `src/styles.css`: Contains `@import "tailwindcss";`, `@source "./src/**/*.{html,ts}";`, and dark theme variants.
   This guarantees that PostCSS processes Tailwind directives directly without Sass parser interference.

---

## 15. Web Accessibility Standards (WCAG 2.2 AA Compliance)

Enterprise applications must ensure full accessibility for users navigating with screen readers, keyboard-only input, or high-contrast assistive tech.

### 15.1 Semantic Landmarks & Hierarchy
- **Header Landmark**: `<header role="banner" class="...">`
- **Navigation Landmark**: `<nav aria-label="Main Navigation" class="...">`
- **Main Landmark**: `<main id="main-content" role="main" tabindex="-1" class="...">`
- **Footer Landmark**: `<footer role="contentinfo" class="...">`
- **Heading Order**: Strictly preserve hierarchical progression: `<h1>` (one per page), `<h2>` (section titles), `<h3>` (card and subsection headers), `<h4>` (list and item headers). Never skip levels.

### 15.2 Skip to Main Content Link
Every page must provide a hidden skip link as the very first focusable element in the DOM:
```html
<a
  href="#main-content"
  class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-emerald-600 focus:text-white focus:rounded-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 font-semibold text-sm transition-all">
  Skip to main content
</a>
```

### 15.3 ARIA Attributes on Interactive Controls
- **Hamburger / Drawer Toggles**:
  ```html
  <button
    mat-icon-button
    (click)="mobileMenuOpen.set(!mobileMenuOpen())"
    [attr.aria-expanded]="mobileMenuOpen()"
    aria-controls="mobile-navigation"
    aria-label="Toggle navigation menu">
    <mat-icon>{{ mobileMenuOpen() ? 'close' : 'menu' }}</mat-icon>
  </button>
  ```
- **Theme Toggles**:
  ```html
  <button
    mat-icon-button
    (click)="themeService.toggleTheme()"
    [attr.aria-label]="themeService.isDark() ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
    <mat-icon>{{ themeService.isDark() ? 'light_mode' : 'dark_mode' }}</mat-icon>
  </button>
  ```
- **Icon-Only Buttons & Action Triggers**: Every `mat-icon-button` MUST specify a descriptive `aria-label`.

### 15.4 Focus Rings & Keyboard Navigation
- Never remove outlines without providing a visible focus indicator:
  `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2`
- All interactive links, cards, and buttons must be accessible via `Tab` and activatable via `Enter` or `Space`.

### 15.5 Color Contrast & Typography
- Minimum contrast ratio of **4.5:1** for standard body text against background in both light and dark themes.
- Minimum contrast ratio of **3:1** for bold headings, large text (18pt+ / 14pt bold+), and essential UI control borders.
- Slate neutral colors: Use `text-slate-700 dark:text-slate-300` for readable paragraph text; avoid excessively low-contrast greys (`text-slate-400` only for non-critical secondary captions).

### 15.6 Form Accessibility
- Every input field must have an explicit `<mat-label>` and clear placeholder.
- Required inputs must have `required` and `aria-required="true"`.
- Real-time errors must be announced with `<mat-error>`.

---

## 16. Concise Button Label Standards

To maintain a clean, confident executive tone and prevent visual clutter across desktop, tablet, and mobile viewports:
- **Rule**: Keep all button labels short, punchy, and direct (typically 1 to 2 words).
- **Prohibited**: Verbose, sentence-like action buttons (e.g., `Submit Consultation Request`, `Explore All Treasury Services & Deep Dives`, `Speak with Our Advisors`, `View All 6 CFO Domains`).
- **Standard Button Lexicon**:

| Verbose Phrasing (Avoid) | Concise Standard (Use) | Typical Context |
| :--- | :--- | :--- |
| `Book Consultation` / `Book Strategy Consultation` | `Inquire` / `Get Started` | Navbar, Hero & Section CTA |
| `Submit Consultation Request` / `Submit Request` | `Submit` / `Send` | Form dialogs, contact forms |
| `Transmitting to Advisors...` / `Submitting...` | `Sending...` | Form loading states |
| `View All X Scopes` / `View Full Scope` | `Details` | Service and category cards |
| `Explore Treasury Services` | `Services` | Hero alternate link |
| `View All 6 CFO Domains` | `Learn More` / `View All` | Cross-link banners |
| `Schedule Leadership Session` / `Connect with Premesh` | `Connect` | Leadership cards & dialogs |
| `Executive Bio Modal` | `Bio` | Leadership bio trigger |
| `Speak with Our Advisors` / `View Contact Details` | `Contact Us` | About & CTA links |

---

## 17. Modal-First Confirmations vs Toasts Policy

> [!IMPORTANT]
> **Zero Toasts for Submissions**: Form submissions, inquiries, and status outcomes MUST use a centered, accessible Material dialog (`MatDialog`) instead of edge snackbar toasts.

- **Why**: Snackbar toasts in the corner or bottom edge are easily missed by executives on wide displays, may be obscured on mobile browsers, and look informal for corporate advisory transactions.
- **Implementation**:
  - Use `FeedbackDialogComponent` with `MatDialog` containing:
    - Status icon circle (`check_circle` in emerald green)
    - Clear title (`Inquiry Received`)
    - Courteous confirmation paragraph specifying senior advisory response timeframe (24 hours)
    - Direct corporate email (`hello@chintap.com`)
    - Single, simple dismiss button (`OK`)
  - Dismissing the modal cleanly leaves the user on their page without lingering notification bars.

---

## 18. Technical SEO, GEO & AI Search Optimization (LLMO) Standards

Modern web applications must be fully indexable and comprehensible by traditional search engines (Google, Bing) and AI-driven answer engines (Perplexity, ChatGPT Search, Claude, Google Gemini).

### 18.1 Canonical Domain Governance & 301 Redirect Rules
- **Single Canonical Source**: Every application must enforce a single canonical domain (e.g. `https://chintap.com/`).
- **Direct 1-Hop 301 Redirects**:
  - `http://chintap.com/*` -> `https://chintap.com/:splat` (301)
  - `https://www.chintap.com/*` -> `https://chintap.com/:splat` (301)
  - `https://chintap.netlify.app/*` -> `https://chintap.com/:splat` (301)
- **Zero Redirect Chains**: Avoid multi-hop redirects (e.g., `http://www` -> `https://www` -> `https://`). Redirect rules in `_redirects` or `netlify.toml` must route non-canonical hosts directly to the final HTTPS canonical URL.
- **Canonical Meta Tag**: Every page must output `<link rel="canonical" href="https://chintap.com/route">` matching the exact rendered path.

### 18.2 Robots Directives & Standard Compliance (`robots.txt`)
- **Standard Directives Only**: Use only RFC-compliant, search-engine-recognized directives in `robots.txt`:
  ```txt
  User-agent: *
  Allow: /

  Sitemap: https://chintap.com/sitemap.xml
  ```
- **Avoid Non-Standard Directives**: Custom directives like `LLM-Reference:` or `LLM-Context:` are non-standard and trigger syntax warnings in search engine parsers. Reference machine-readable resources via clean comments instead:
  ```txt
  # LLM Context: https://chintap.com/llms.txt
  # Full Documentation: https://chintap.com/contents.md
  ```

### 18.3 Machine-Readable Context for Generative Engines (`llms.txt` & `contents.md`)
- **`public/llms.txt`**: Concise, highly-structured Markdown file outlining:
  - Studio identity, philosophy, and positioning.
  - Physical office address and contact points.
  - Complete list of primary routes and page purposes.
  - Verified technology partners and external platforms.
- **`public/contents.md`**: Comprehensive textual export of all website copy, section by section. Enables AI search agents, automated summarizers, and retrieval-augmented pipelines to read complete site content without executing client-side JavaScript.
- **Static Asset Routing**: Both files must be placed in `public/` so they are copied directly to the build root and served as raw `text/plain` or `text/markdown` with HTTP 200, never falling back to `index.html`.

### 18.4 Structured Data Graphs (JSON-LD Schema.org)
- **Unified `@graph` Structure**: Inject a comprehensive Schema.org JSON-LD graph into `src/index.html` or dynamically via `SeoService`:
  - `Organization` / `ProfessionalService`: Name, alternate names, legal name, URL, logo, geo-coordinates, postal address, and contact points.
  - `WebSite`: Publisher `@id`, search URL, name.
  - `WebPage` & `BreadcrumbList`: Accurate hierarchy and page metadata for each route.
- **Entity Consistency**: All details (company name, street address, postal code, phone, email, partner links) must be 100% identical between Schema.org JSON-LD, visible HTML microdata (`itemscope`, `itemprop`), Markdown exports, and header metadata.

### 18.5 Route Pre-rendering (SSG) & Static Asset Integrity
- **Full Static Pre-rendering**: Angular SSG (`@angular/ssr`) must pre-render every public route at build time. When a web crawler or bot requests `/building-teams`, the server must return complete semantic HTML with `<h1>`, `<p>`, and navigation elements — not an empty `<app-root></app-root>`.
- **404 Handling**: Unrecognized routes must resolve to a customized 404 template or proper HTTP status code, not infinite client-side redirect loops.

### 18.6 HTTP Security & Caching Headers
Configure headers in `netlify.toml`:
- **Immutable Static Assets**: `/*.[hash].js`, `/*.[hash].css`, `/images/*`:
  `Cache-Control: public, max-age=31536000, immutable`
- **Dynamic & Manifest Files**: `/index.html`, `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/contents.md`:
  `Cache-Control: public, max-age=0, must-revalidate`
- **Security Headers**:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: geolocation=(), camera=(), microphone=()`

### 18.7 Production Verification Checklist (Live vs Local)
Before declaring an SEO or release milestone complete, execute two distinct verification passes:
1. **Local Build & Test Verification**:
   - `npm test -- --watch=false` (all unit and SEO assertions pass).
   - `npm run build` (SSG pre-renders all 8 routes without hydration errors).
   - Verify generated files in `dist/*/browser/` (`robots.txt`, `sitemap.xml`, `llms.txt`, `contents.md`, and static HTML for all routes).
2. **Live Production Remote Verification**:
   - Query all canonical routes (`https://chintap.com/`, `/what-we-do`, `/explorations`, `/building-teams`, `/partners`, `/how-we-work`, `/about`, `/contact`) with `curl -ILs` to confirm HTTP 200.
   - Verify direct 301 redirects from `http://`, `www.`, and `*.netlify.app`.
   - Verify `robots.txt`, `sitemap.xml`, `llms.txt`, and `contents.md` return HTTP 200 with matching Content-Type and accurate entity data.



