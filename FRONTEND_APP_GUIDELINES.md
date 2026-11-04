# Frontend Application Guidelines & Standards

> **Stack**: Angular 22+ · Angular Material 22+ · Tailwind CSS 4+ · Angular SSR/SSG · Netlify · Strict TypeScript · Light-Default Theming

This standard defines the architecture, UI system, accessibility, and deployment rules for enterprise-grade, high-performance, SEO-first frontend applications.

---

## 1. Stack & Version Matrix

| Technology | Requirement | Rules & Scope |
| :--- | :--- | :--- |
| **Angular** | `^22.0.0` | Standalone components only (`standalone: true`), Signals (`signal`, `computed`), Control Flow (`@if`, `@for`, `@let`), `inject()`. No `NgModules`. |
| **Angular Material** | `^22.0.0` | **Mandatory** for all UI controls: buttons, dialogs, form fields, cards, tooltips, icons, chips, dividers, and progress spinners (`MatProgressSpinner`). |
| **Tailwind CSS** | `^4.0.0` | Exclusively for layout, responsive grid/flexbox, spacing, typography sizing, and theme color variants. |
| **Prerendering (SSG)** | `@angular/ssr` | Build-time prerendering for all static routes. Netlify serves pure pre-rendered HTML with zero hydration flicker. |
| **Hosting** | Netlify | Static CDN hosting via `publish = "dist/<app>/browser"`, `NODE_VERSION = "22"`, automated CI/CD. |
| **TypeScript** | `^5.6.0` | Strict mode enabled (`strict: true`, `noImplicitAny: true`, `strictNullChecks: true`). |

---

## 2. Directory Architecture

Organize by **Core - Shared - Features**:

```
src/
├── app/
│   ├── core/                  # Singletons: theme, content, loading, version, SEO, models
│   │   ├── services/          # ThemeService, ContentService, LoadingService, NetlifyFormService
│   │   ├── models/            # Strict TypeScript interfaces & types
│   │   └── version.ts         # Dynamic package.json version export
│   ├── shared/                # Dumb/reusable UI: header, footer, page-loader, showcases, badges
│   │   ├── components/        # Header, Footer, PageLoader, CommercialShowcase, ExploreNext, FloatingWhatsapp
│   │   └── dialogs/           # Strictly Angular Material MatDialog implementations
│   ├── features/              # Modals and specialized feature components
│   ├── pages/                 # Route-level page components (lazy-loaded in app.routes.ts)
│   ├── app.routes.ts          # Prerendered route definitions with descriptive titles
│   ├── app.config.ts          # Root providers (Router, SSR, Material animations, HttpClient)
│   └── app.ts                 # Shell component (<app-header>, <app-page-loader>, <router-outlet>, <app-footer>)
├── assets/ / public/          # Images, logos, robots.txt, sitemap.xml, site.webmanifest
├── index.html                 # Shell HTML, preconnect fonts, JSON-LD Schema, hidden Netlify forms
├── styles.css                 # @import "tailwindcss"; @import Material theme; base styles
└── netlify.toml               # Netlify build, redirects, and header caching
```

---

## 3. UI Component & Styling Rules

### 3.1 Strict Angular Material Policy
* **Never build custom form inputs or native buttons from raw Tailwind divs**.
* Mandatory elements:
  * Buttons: `mat-flat-button`, `mat-stroked-button`, `mat-icon-button`.
  * Dialogs: `MatDialog` (`MatDialogRef`, `MatDialogTitle`, `MatDialogContent`, `MatDialogActions`).
  * Form controls: `mat-form-field`, `mat-label`, `matInput`, `mat-select`, `mat-error`.
  * Spinners & Loaders: `mat-progress-spinner` (`MatProgressSpinnerModule`) styled with Electric Red (`#d3121a`) tokens.
  * Icons: `mat-icon` (Material Symbols Outlined) or clean inline SVG for external brand icons (e.g., WhatsApp).

### 3.2 Tailwind CSS Boundary
* Use Tailwind for:
  * Responsive layout: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8`.
  * Spacing & rhythm: `py-16 sm:py-24`, `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
  * Subtle hover micro-interactions: `transition-all duration-300 hover:scale-[1.02]`.
* **Zero custom button reinvention**: Style Material buttons via utility classes (e.g. `!bg-[#d3121a] hover:!bg-[#b91c1c] !rounded-full !px-8 !py-3.5 !font-semibold min-h-[44px]`).
* **Hero Section Vertical Rhythm**: To prevent pushing critical value propositions and primary CTAs below the fold on laptop/desktop displays (1366x768, 1440x900, 1080p), hero sections must maintain compact top padding: `pt-6 pb-12 sm:pt-8 sm:pb-14 lg:pt-9 lg:pb-16`. Combined with the 80px (`h-20`) sticky navbar, this provides an optimal ~36px top gap on desktop without wasted dead space.

### 3.3 Typography & Brand Distinction
* **Headings & Body**: Clean, modern, highly legible geometric fonts (e.g. `Poppins` 600/700 for headings, `Roboto` 400/500 for body). Never use heavy display weights (`font-black`) across full sentences.
* **Brand Wordmark Only**: Bold, blunt industrial styling (`font-black`, `uppercase`, tight tracking) is reserved exclusively for the brand name / logo (e.g. `.astar-brand-word`).

---

## 4. Modals & Dialogs (`MatDialog`)

> [!CAUTION]
> Never use `window.alert()`, `window.confirm()`, or unmanaged DOM overlays. All modal experiences must use `MatDialog`.

* **Dialog Shell Standard**:
  ```ts
  this.dialog.open(ProjectInquiryDialogComponent, {
    panelClass: 'inquiry-modal-panel',
    autoFocus: 'first-tabbable',
    restoreFocus: true
  });
  ```
* **Styling**: Rounded surface (`rounded-3xl` / `1.75rem`), frosted backdrop blur (`backdrop-blur-md`), max-height constraint (`max-h-[90vh]`), and dedicated scroll container on `mat-dialog-content`.
* **Mobile Handling**: Full width responsive padding (`max-w-[min(94vw,580px)]`).

---

## 5. Dual-Theme System (Light Mode Default)

* **Default State**: Light mode is the active default theme (`isDark = false`).
* **Implementation**: Angular Signal in `ThemeService`, toggling `.dark` class on `document.documentElement` (`<html class="dark">`).
* **Persistence**: Synchronize to `localStorage.getItem('astar-theme')` with graceful SSR fallback (`typeof window !== 'undefined'`). Defaults to light theme across all user sessions.
* **Toggle Visibility**: The theme toggle button in the header is hidden for now per client preference while the icon is finalized (crescent icon removed). Dark mode styling and architecture remain fully implemented and available under the hood.
* **High Contrast**: Ensure text contrast meets WCAG 2.2 AA (minimum 4.5:1 for body copy).

---

## 6. Page Loading States & Route Transitions (`MatProgressSpinner`)

> [!IMPORTANT]
> Visual loading feedback is mandatory during all route navigations and lazy-loaded chunk downloads to prevent perceived latency, frozen UI states, or accidental duplicate user interactions.

* **Architecture**:
  * **Singleton `LoadingService` (`src/app/core/services/loading.service.ts`)**:
    * Subscribes to Angular Router events: `NavigationStart`, `NavigationEnd`, `NavigationCancel`, `NavigationError`.
    * Exposes an Angular Signal: `readonly isLoading = signal<boolean>(false)`.
    * Applies a micro-debounce (30ms) to ensure instantaneous cached navigations do not cause 1-frame visual flashes, while network and chunk loads receive immediate feedback.
    * Provides `show(msg?)` and `hide()` for custom async triggers (e.g. data fetching, heavy computations).
  * **Global `PageLoaderComponent` (`src/app/shared/components/page-loader/`)**:
    * Placed directly in the root `AppComponent` template shell (`<app-page-loader />`).
    * Combines a precision 3px top indeterminate progress accent in Electric Red (`#d3121a`) with a centered frosted modal card.
    * Uses Angular Material's `MatProgressSpinner` (`[diameter]="48"` and `[strokeWidth]="4"`).
    * Mounts and unmounts cleanly via control flow `@if (loadingService.isLoading())` ensuring zero idle DOM overhead.
* **Styling & Theming**:
  * Spinner color is bound to `--mat-progress-spinner-active-indicator-color: #d3121a !important;`.
  * Frosted backdrop (`backdrop-blur-[2px] bg-stone-900/25 dark:bg-black/45`) softly dims the page while maintaining context and preventing input collisions during navigation.
* **Accessibility (WCAG 2.2 AA)**:
  * Container has `role="status"` and `aria-live="polite"`.
  * Screen-reader text `<span class="sr-only">Loading page...</span>` announces page transition state to assistive technologies.
  * Honors `@media (prefers-reduced-motion: reduce)` by disabling top-bar sliding animations.

---

## 7. Static Site Generation (SSG) & Prerendering

* **Configuration (`angular.json`)**:
  ```json
  "prerender": {
    "discoverRoutes": true,
    "routesFile": "src/routes.txt"
  }
  ```
* **Routes File (`src/routes.txt`)**: Explicitly list all application routes (`/`, `/about`, `/services`, `/safety-quality`, `/projects`, `/contact`, `/404`).
* **Output**: Production build generates pre-rendered `index.html` files inside each route subfolder in `dist/<app>/browser/`.
* **Instant Delivery**: Serves static HTML immediately from Netlify Edge without JavaScript runtime delays.

---

## 8. Netlify Deployment & Server Headers

* **Configuration (`netlify.toml`)**:
  ```toml
  [build]
    publish = "dist/astar/browser"
    command = "npm run build"

  [build.environment]
    NODE_VERSION = "22"

  [[redirects]]
    from = "/*"
    to = "/index.html"
    status = 200
  ```
* **Server Headers (`public/_headers`)**:
  * Provide explicit JSON MIME types and CORS headers for machine endpoints:
    ```
    /.well-known/ard.json
      Content-Type: application/json; charset=UTF-8
      Access-Control-Allow-Origin: *
      Cache-Control: public, max-age=3600

    /site.webmanifest
      Content-Type: application/manifest+json; charset=UTF-8
      Access-Control-Allow-Origin: *
    ```
* **Form Crawler Registration (`index.html`)**: Hidden HTML form inside `<body>` with matching field names for Netlify's build-time crawler:
  ```html
  <form name="contact" data-netlify="true" netlify-honeypot="bot-field" hidden>
    <input type="hidden" name="form-name" value="contact" />
    <input type="text" name="name" />
    <input type="email" name="email" />
    <textarea name="message"></textarea>
  </form>
  ```
* **Client-Side Submission**: Submit urlencoded form payload via native `fetch('/', { method: 'POST', body: ... })`.
* **Feedback States**: In-place confirmation card on successful submission with a reset trigger.

---

## 9. Performance & PageSpeed Optimization

> [!IMPORTANT]
> Eliminate render-blocking CSS and font requests on initial page load to maximize Lighthouse / PageSpeed Insights performance scores.

* **Non-Render-Blocking Web Fonts & Icons**:
  * Never link Google Fonts or Material Icons using blocking `<link rel="stylesheet">` in `<head>`.
  * Use the asynchronous stylesheet loading pattern with `<noscript>` fallback:
    ```html
    <!-- Preconnect to Font CDNs -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <!-- Asynchronous Non-Render-Blocking Load with Swap -->
    <link
      rel="preload"
      as="style"
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Roboto:wght@400;500;700&display=swap"
      onload="this.onload=null;this.rel='stylesheet'"
    />
    <noscript>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Roboto:wght@400;500;700&display=swap" />
    </noscript>

    <link
      rel="preload"
      as="style"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
      onload="this.onload=null;this.rel='stylesheet'"
    />
    <noscript>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" />
    </noscript>
    ```
  * Always append `&display=swap` to prevent Flash of Invisible Text (FOIT).

---

## 10. Agent Discoverability & Resource Catalogs (ARD Manifest)

> [!NOTE]
> AI agents, web crawlers, and LLM reasoning engines (e.g. ChatGPT, Gemini, Perplexity) discover site capabilities via Agentic Resource Discovery (ARD) manifests.

* **Specification**: Serve a valid JSON manifest at `/.well-known/ard.json` complying with the [Agentic Resource Discovery (ARD) specification](https://agenticresourcediscovery.org/spec/).
* **HTML Head Link**: Link the manifest in `<head>` of `index.html`:
  ```html
  <link rel="ard" href="/.well-known/ard.json" />
  ```
* **Critical Rule — Prevent SPA Routing Interception**:
  * An SPA rewrite rule (`/* -> /index.html 200`) will return `index.html` (HTML) instead of JSON if `/.well-known/ard.json` is missing or unmapped, producing:
    `Malformed JSON in manifest: SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON`.
  * Always place the static `ard.json` file inside `public/.well-known/ard.json` so build tools copy it to `dist/<app>/browser/.well-known/ard.json`.
  * Ensure the server emits `Content-Type: application/json; charset=UTF-8` and `Access-Control-Allow-Origin: *`.
* **Standard Manifest Schema**:
  ```json
  {
    "version": "1.0",
    "name": "Application Name",
    "description": "Commercial capabilities & catalog",
    "resources": [
      { "id": "llms-txt", "name": "LLMs.txt", "url": "/llms.txt", "format": "text/markdown" },
      { "id": "catalog", "name": "Catalog", "url": "/services", "format": "text/html" }
    ]
  }
  ```

---

## 11. Accessibility Standards (WCAG 2.2 AA)

* **Color Contrast Ratio Compliance (WCAG AA 4.5:1 Threshold)**:
  * Brand red on white backgrounds must have a contrast ratio $\ge 4.5:1$.
  * `#ea1c24` has relative luminance 0.1858, giving a contrast ratio of **4.45:1** against `#ffffff` (fails WCAG AA).
  * Use **`#d3121a`** (contrast ratio **5.53:1** on white, **5.24:1** on `stone-50`), fully passing WCAG AA.
  * In dark mode (`bg-stone-900`, `bg-stone-950`), use **`text-red-400` (`#f87171`)** (contrast ratio **6.73:1**), never dark red.
* **Document Landmark Hierarchy**:
  * The root application layout (`src/app/app.ts`) must contain exactly one top-level `<main>` landmark wrapping the router outlet:
    ```html
    <main id="main-content" class="flex-1">
      <router-outlet />
    </main>
    ```
  * Pair with an accessible skip-link: `<a href="#main-content" class="sr-only focus:not-sr-only ...">Skip to content</a>`.
* **Touch Targets (44px Minimum)**:
  * All interactive elements (links, action buttons, quick contact pills, chips, mobile drawer items) must have a minimum bounding box of **44x44px** (`min-h-[44px]` or `min-h-[48px]`).
* **Identical Link Disambiguation**:
  * When multiple links share similar anchor text (e.g. "Call Direct", "Start Chat", "Compose", phone numbers), assign descriptive `aria-label` attributes to clarify their unique target:
    ```html
    <a [href]="'tel:' + phone" aria-label="Direct call to AStar Electricals desk">...</a>
    <a [href]="whatsappUrl" aria-label="Start WhatsApp chat with Priority Desk">...</a>
    <a [href]="'mailto:' + email" aria-label="Send email to AStar Electricals inbox">...</a>
    ```
* **Keyboard Navigation**:
  * Universal high-contrast focus rings:
    ```css
    *:focus-visible {
      outline: 3px solid #d3121a !important;
      outline-offset: 3px !important;
    }
    ```
* **Aria Attributes**: All icon-only buttons require explicit `aria-label`. All decorative SVGs/icons require `aria-hidden="true"`.
* **Concise Button Labels**: Keep all button labels short, punchy, and direct (strictly 1 to 2 words, e.g., *"Contact"*, *"Inquire"*, *"Submit"*, *"Connect"*).

---

## 12. SEO, Social Metadata & AI Search (LLMO)

* **Meta Tags in `index.html`**:
  * Accurate `<title>`, `<meta name="description">`, `<meta name="author">`.
  * OpenGraph: `og:title`, `og:description`, `og:image` (1200x630px), `og:url`, `og:type="website"`.
  * Twitter / X cards: `summary_large_image`.
* **Structured Data (JSON-LD)**: Embed Schema.org markup (`@type: ["LocalBusiness", "Store"]` or `Organization`) with legal name, GSTIN, telephone, geo coordinates, and opening hours.
* **Crawler Directives**: Provide `robots.txt` and `sitemap.xml`.

---

## 13. Semantic Versioning & Release Checklist

1. **Version Tracking**:
   * Version defined in `package.json` (`"version": "X.Y.Z"`).
   * Imported via `src/app/core/version.ts` and rendered dynamically in the footer (`v{{ content.version }}`).
   * Bumps follow SemVer: `Patch` for bugfixes/tweaks, `Minor` for features/pages, `Major` for architectural overhauls.
2. **Pre-Commit Verification**:
   * `npm test -- --watch=false` passes all unit tests.
   * `npm run build` completes with zero errors and all routes prerendered.
   * Light and Dark modes visually validated.
   * Floating WhatsApp and direct channels tested.
3. **Git Release Flow**:
   ```bash
   git add .
   git commit -m "feat: <description> vX.Y.Z"
   git tag -a vX.Y.Z -m "Release vX.Y.Z"
   git push origin main --tags
   ```
