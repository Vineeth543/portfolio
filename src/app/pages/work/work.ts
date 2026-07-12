import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Project, WorkProjectCardComponent } from '../../components/work-project-card/work-project-card';
import { ScrollReveal } from '../../shared/scroll-reveal.directive';

const GARUDA_REVEAL_DELAY_MS = 500;

@Component({
  selector: 'app-work',
  imports: [RouterLink, ScrollReveal, WorkProjectCardComponent],
  templateUrl: './work.html',
  styleUrl: './work.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Work {
  private readonly destroyRef = inject(DestroyRef);

  protected readonly projects: Project[] = [
    {
      key: 'ssp',
      org: 'Netcracker Technology · Team Project',
      timeframe: 'Aug 2024 – Present',
      title: 'B2B Self-Service Portal UI',
      overview:
        'A customer- and CSR-facing telecom eCommerce and eCare portal enabling enterprise customers to browse product catalogs, configure offers, manage billing accounts, and self-serve across products, finances, and orders.',
      bullets: [
        'Contributed to a modular Angular SPA with lazy-loaded routing and authentication-based route guarding.',
        'Helped implement a smart product search delivering sub-second results and a 30% lift in user engagement.',
        'Contributed to a large multi-domain NgRx state architecture with cross-session persistence.',
      ],
      tags: ['Angular', 'TypeScript', 'NgRx', 'RxJS', 'Bootstrap', 'Playwright'],
      note: 'Built by a team of engineers — described here at a level appropriate for public sharing.',
      motif: 'grid',
    },
    {
      key: 'oc',
      org: 'Netcracker Technology · Team Project',
      timeframe: 'Sep 2022 – Jul 2024',
      title: 'B2B Order Capture UI',
      overview:
        'An enterprise order-management frontend for quote creation, catalog browsing, customer onboarding, and multi-step checkout — used by customers and CSR agents.',
      bullets: [
        'Contributed to a multi-session NgRx architecture, reducing session-recovery time to near-zero.',
        'Helped build a real-time WebSocket notification system enabling concurrent quote collaboration.',
        'Helped implement a micro-frontend shell for embedding within a parent portal.',
      ],
      tags: ['Angular', 'TypeScript', 'NgRx', 'RxJS', 'LESS', 'Playwright'],
      note: 'Built by a team of engineers — described here at a level appropriate for public sharing.',
      motif: 'flow',
    },
    {
      key: 'panchayat',
      org: 'Academic Capstone',
      timeframe: 'Final Year · 2022',
      title: 'Citizen Centric Panchayat System',
      overview:
        'A full-stack E-Panchayat e-governance platform letting rural citizens apply for certificates, submit complaints, pay taxes online, and track applications — with role-based dashboards for officials.',
      bullets: [
        'Built a React front end with role-specific dashboards for Admin, PDO, Secretary, President, and Citizen roles.',
        'Contributed to Node/Express/MongoDB back-end integration, including Razorpay payments and AWS S3 document storage.',
        'Implemented automated lowest-quotation identification for e-tender submissions.',
      ],
      tags: ['React', 'Node.js', 'MongoDB', 'Razorpay', 'AWS S3', 'Tailwind CSS'],
      note: 'My primary hands-on React project and clearest full-stack demonstration prior to Netcracker and Garuda. Built as a team-submitted academic capstone.',
      motif: 'radial',
    },
  ];

  protected readonly garudaVisible = signal(false);
  protected readonly garudaDash = computed(() => (this.garudaVisible() ? '0' : '900'));

  constructor() {
    const garudaTimer = setTimeout(() => this.garudaVisible.set(true), GARUDA_REVEAL_DELAY_MS);
    this.destroyRef.onDestroy(() => clearTimeout(garudaTimer));
  }
}
