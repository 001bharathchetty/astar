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
  * Spinners & Loaders: `mat-progress-spinner` (`MatProgressSpinnerModule`) styled with Electric Red (`#ea1c24`) tokens.
  * Icons: `mat-icon` (Material Symbols Outlined) or clean inline SVG for external brand icons (e.g., WhatsApp).

### 3.2 Tailwind CSS Boundary
* Use Tailwind for:
  * Responsive layout: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8`.
  * Spacing & rhythm: `py-16 sm:py-24`, `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
  * Subtle hover micro-interactions: `transition-all duration-300 hover:scale-[1.02]`.
* **Zero custom button reinvention**: Style Material buttons via utility classes (e.g. `!bg-[#ea1c24] !rounded-full !px-8 !py-3.5 !font-semibold`).

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

* **Default State**: Light mode is the default (`isDark = false`).
* **Implementation**: Angular Signal in `ThemeService`, toggling `.dark` class on `document.documentElement` (`<html class="dark">`).
* **Persistence**: Synchronize to `localStorage.getItem('theme')` with graceful SSR fallback (`typeof window !== 'undefined'`).
* **Toggle Icon**: Use a **crescent moon** SVG in light mode (clicking enables dark mode) and a **sun** SVG in dark mode (clicking enables light mode).
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
    * Combines a precision 3px top indeterminate progress accent in Electric Red (`#ea1c24`) with a centered frosted modal card.
    * Uses Angular Material's `MatProgressSpinner` (`[diameter]="48"` and `[strokeWidth]="4"`).
    * Mounts and unmounts cleanly via control flow `@if (loadingService.isLoading())` ensuring zero idle DOM overhead.
* **Styling & Theming**:
  * Spinner color is bound to `--mat-progress-spinner-active-indicator-color: #ea1c24 !important;`.
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

## 8. Netlify Deployment & Form Handling

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

## 9. SEO, Social Metadata & AI Search (LLMO)

* **Meta Tags in `index.html`**:
  * Accurate `<title>`, `<meta name="description">`, `<meta name="author">`.
  * OpenGraph: `og:title`, `og:description`, `og:image` (1200x630px), `og:url`, `og:type="website"`.
  * Twitter / X cards: `summary_large_image`.
* **Structured Data (JSON-LD)**: Embed Schema.org markup (`@type: ["LocalBusiness", "Store"]` or `Organization`) with legal name, GSTIN, telephone, geo coordinates, and opening hours.
* **Crawler Directives**: Provide `robots.txt` and `sitemap.xml`.

---

## 10. Accessibility Standards (WCAG 2.2 AA)

* **Keyboard Navigation**: Universal high-contrast focus rings (`*:focus-visible { outline: 3px solid #ea1c24 !important; outline-offset: 3px !important; }`).
* **Skip Links**: Accessible `#main-content` skip link at top of `app.ts`.
* **Touch Targets**: Minimum 44x44px for all mobile interactive targets.
* **Aria Attributes**: All icon-only buttons require explicit `aria-label`. All decorative SVGs require `aria-hidden="true"`.
* **Concise Button Labels**: Keep all button labels short, punchy, and direct (strictly 1 to 2 words, e.g., *"Contact"*, *"Inquire"*, *"Submit"*, *"Connect"*). Never use verbose sentence-like strings on buttons or action triggers.

---

## 11. Semantic Versioning & Release Checklist

1. **Version Tracking**:
   * Version defined in `package.json` (`"version": "X.Y.Z"`).
   * Imported via `src/app/core/version.ts` and rendered dynamically in the footer (`v{{ content.version }}`).
   * Bumps follow SemVer: `Patch` for bugfixes/tweaks, `Minor` for features/pages, `Major` for architectural overhauls.
2. **Pre-Commit Verification**:
   * `npm run build` must complete with zero errors and all routes prerendered.
   * Light and Dark modes visually validated.
   * Floating WhatsApp and direct channels tested.
3. **Git Release Flow**:
   ```bash
   git add .
   git commit -m "feat: <description> vX.Y.Z"
   git tag -a vX.Y.Z -m "Release vX.Y.Z"
   git push origin main --tags
   ```
