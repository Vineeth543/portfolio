import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

const SITE_URL = 'https://www.vineeth.software';

export interface PageSeo {
  title: string;
  description: string;
  path: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  setPageSeo(seo: PageSeo): void {
    this.titleService.setTitle(seo.title);
    this.metaService.updateTag({ name: 'description', content: seo.description });
    this.updateCanonical(`${SITE_URL}${seo.path}`);
  }

  private updateCanonical(url: string): void {
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
