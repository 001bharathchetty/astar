import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface SeoConfig {
  title: string;
  description: string;
  url?: string;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly document = inject(DOCUMENT);

  readonly defaultOgImage = 'https://astarelectricals.com/images/astar-og.png';

  get siteBaseUrl(): string {
    return 'https://astarelectricals.com';
  }

  setSeoData(config: SeoConfig): void {
    const title = config.title.trim();
    this.titleService.setTitle(title);

    const description = config.description.trim();
    const baseUrl = this.siteBaseUrl;

    const resolvedUrl = config.url
      ? (config.url.startsWith('http')
          ? config.url
          : `${baseUrl}${config.url.startsWith('/') ? '' : '/'}${config.url}`)
      : baseUrl;

    const resolvedImage = config.image
      ? (config.image.startsWith('http')
          ? config.image
          : `${baseUrl}${config.image.startsWith('/') ? '' : '/'}${config.image}`)
      : this.defaultOgImage;

    // Standard HTML meta
    this.metaService.updateTag({ name: 'description', content: description });

    // OpenGraph (WhatsApp, LinkedIn, Slack, Facebook)
    this.metaService.updateTag({ property: 'og:site_name', content: 'AStar Electricals' });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:url', content: resolvedUrl });
    this.metaService.updateTag({ property: 'og:image', content: resolvedImage });
    this.metaService.updateTag({ property: 'og:image:secure_url', content: resolvedImage });
    this.metaService.updateTag({ property: 'og:image:type', content: 'image/png' });
    this.metaService.updateTag({ property: 'og:image:width', content: '1200' });
    this.metaService.updateTag({ property: 'og:image:height', content: '630' });
    this.metaService.updateTag({ property: 'og:image:alt', content: title });
    this.metaService.updateTag({ property: 'og:locale', content: 'en_IN' });

    // Twitter Card
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: description });
    this.metaService.updateTag({ name: 'twitter:url', content: resolvedUrl });
    this.metaService.updateTag({ name: 'twitter:image', content: resolvedImage });

    // Canonical link
    this.updateCanonicalLink(resolvedUrl);

    // Route-level Structured Data
    this.updateRouteStructuredData(resolvedUrl, title, description, config.url);
  }

  private updateCanonicalLink(url: string): void {
    try {
      if (this.document && this.document.head) {
        let link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');
        if (!link) {
          link = this.document.createElement('link');
          link.setAttribute('rel', 'canonical');
          this.document.head.appendChild(link);
        }
        link.setAttribute('href', url);
      }
    } catch {
      // Graceful fallback for non-DOM SSR environments
    }
  }

  private updateRouteStructuredData(
    resolvedUrl: string,
    title: string,
    description: string,
    urlPath?: string
  ): void {
    try {
      if (!this.document || !this.document.head) return;

      let script: HTMLScriptElement | null = this.document.getElementById('route-schema') as HTMLScriptElement;
      if (!script) {
        script = this.document.createElement('script');
        script.id = 'route-schema';
        script.type = 'application/ld+json';
        this.document.head.appendChild(script);
      }

      const isRoot = !urlPath || urlPath === '/' || urlPath === '';
      const schema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${resolvedUrl}#webpage`,
        url: resolvedUrl,
        name: title,
        description: description,
        isPartOf: {
          '@id': 'https://astarelectricals.com/#website'
        }
      };

      if (!isRoot) {
        const pathSegment = urlPath.replace(/^\//, '').split('/')[0];
        const pageName = pathSegment
          .split('-')
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');

        schema['breadcrumb'] = {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://astarelectricals.com/'
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: pageName,
              item: resolvedUrl
            }
          ]
        };
      }

      script.textContent = JSON.stringify(schema, null, 2);
    } catch {
      // Graceful fallback for non-DOM SSR environments
    }
  }
}
