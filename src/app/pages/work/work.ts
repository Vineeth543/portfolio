import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  AdditionalProject,
  AdditionalProjectCardComponent,
} from '../../components/additional-project-card/additional-project-card';
import {
  Project,
  WorkProjectCardComponent,
} from '../../components/work-project-card/work-project-card';
import { SeoService } from '../../core/seo.service';
import { ScrollReveal } from '../../shared/scroll-reveal.directive';

const GARUDA_REVEAL_DELAY_MS = 500;

@Component({
  selector: 'app-work',
  imports: [RouterLink, ScrollReveal, WorkProjectCardComponent, AdditionalProjectCardComponent],
  templateUrl: './work.html',
  styleUrl: './work.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Work {
  private readonly destroyRef = inject(DestroyRef);
  private readonly seo = inject(SeoService);

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

  protected readonly additionalProjects: AdditionalProject[] = [
    {
      title: 'Portfolio',
      category: 'PERSONAL PROJECT',
      description:
        'This site itself — an Angular app built with standalone components, signals, and zoneless change detection, styled with Tailwind CSS v4 and deployed on GitHub Pages under a custom domain with light/dark theming. The contact form runs on a separate Fastify + Resend serverless backend on Vercel; built solo, with AI coding tools — including Claude Code — as a genuine part of the workflow.',
      techStack: ['Angular', 'Tailwind CSS', 'Fastify', 'Resend', 'GitHub Pages'],
      screenshotPath: '/assets/portfolio.png',
      liveUrl: 'https://www.vineeth.software/',
      githubUrl: 'https://github.com/Vineeth543/portfolio',
    },
    {
      title: 'Eraya',
      category: 'FREELANCE PROJECT',
      description:
        'A freelance project for Eraya, an interior design business, built with Angular, HTML, CSS, and Tailwind CSS.',
      techStack: ['Angular', 'HTML', 'CSS', 'Tailwind CSS'],
      screenshotPath: '/assets/eraya.png',
      liveUrl: 'https://erayainteriors.in/',
      githubUrl: 'https://github.com/Vineeth543/eraya',
    },
    {
      title: 'Book My Show Clone',
      category: 'INTERNSHIP · REACT',
      description:
        'One of my first React projects, built during the DevTown (formerly ShapeAI) front-end internship while I was still learning React. A movie-ticketing clone with carousels and multiple layout types, using the IMDB API for data and Razorpay for payments.',
      techStack: ['React', 'Tailwind CSS', 'IMDB API', 'Razorpay'],
      screenshotPath: '/assets/book-my-show.png',
      liveUrl: 'https://book-my-show-project.vercel.app/',
      githubUrl: 'https://github.com/Vineeth543/book-my-show-project',
      linkedInUrl:
        'https://www.linkedin.com/posts/vineeth-serigar_webdevelopment-frontend-react-activity-6827084927117398016-7x-k/',
    },
    {
      title: 'Task Manager',
      category: 'INTERNSHIP · JAVASCRIPT',
      description:
        'An early project from the same DevTown internship, built specifically to learn DOM manipulation fundamentals. A task management app in plain HTML, CSS, and vanilla JavaScript — no framework.',
      techStack: ['HTML5', 'CSS3', 'JavaScript'],
      screenshotPath: '/assets/task-manager.png',
      liveUrl: 'https://vineeth543.github.io/dom-manipulation-project-task-manage/',
      githubUrl: 'https://github.com/Vineeth543/dom-manipulation-project-task-manage',
      linkedInUrl:
        'https://www.linkedin.com/posts/vineeth-serigar_task2-activity-6824778699792011264-KG3v/',
    },
  ];

  protected readonly garudaVisible = signal(false);
  protected readonly garudaDash = computed(() => (this.garudaVisible() ? '0' : '900'));

  constructor() {
    this.seo.setPageSeo({
      title: 'Projects & Case Studies | Vineeth Serigar',
      description:
        "Selected engineering work: Garuda's real-time trading platform, two Netcracker Technology B2B portals, and smaller freelance and personal projects.",
      path: '/work',
    });

    const garudaTimer = setTimeout(() => this.garudaVisible.set(true), GARUDA_REVEAL_DELAY_MS);
    this.destroyRef.onDestroy(() => clearTimeout(garudaTimer));
  }
}
