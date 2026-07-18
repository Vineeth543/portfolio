import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { SeoService } from '../../core/seo.service';
import {
  CareerNode,
  CareerTimelineNodeComponent,
} from '../../components/career-timeline-node/career-timeline-node';
import { ProjectCardData, ProjectCardComponent } from '../../components/project-card/project-card';
import { SkillBadge, SkillBadgeComponent } from '../../components/skill-badge/skill-badge';
import { StatCounterComponent, StatCounterData } from '../../components/stat-counter/stat-counter';
import {
  TechStackCardComponent,
  TechStackCategory,
} from '../../components/tech-stack-card/tech-stack-card';
import {
  TestimonialPlaceholderComponent,
  TestimonialPlaceholderData,
} from '../../components/testimonial-placeholder/testimonial-placeholder';
import { ScrollReveal } from '../../shared/scroll-reveal.directive';

const ROLES: readonly string[] = [
  'Angular + TypeScript + RxJS + NgRx',
  '4+ Years Building Enterprise B2B Portals',
  'Full-Stack Craftsman',
  'Solo-Built a Live Stock Market Data Platform',
  'Processing 1,500 Packets/sec in Real Time',
  'Currently Open to New Opportunities',
];

const TYPE_SPEED_MS = 55;
const DELETE_SPEED_MS = 28;
const PAUSE_MS = 1500;
const STATS_DELAY_MS = 500;
const GARUDA_REVEAL_DELAY_MS = 900;

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    ScrollReveal,
    SkillBadgeComponent,
    StatCounterComponent,
    TechStackCardComponent,
    ProjectCardComponent,
    CareerTimelineNodeComponent,
    TestimonialPlaceholderComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly destroyRef = inject(DestroyRef);
  private readonly seo = inject(SeoService);

  protected readonly heroBadges: SkillBadge[] = [
    { label: 'Angular', variant: 'filled', size: 'lg' },
    { label: 'TypeScript', size: 'lg' },
    { label: 'RxJS', size: 'lg' },
    { label: 'NgRx', size: 'lg' },
  ];

  protected readonly stats: StatCounterData[] = [
    { target: 4, label: 'Years Experience', suffix: '+', color: 'text' },
    {
      target: 1500,
      label: 'Packets Decoded',
      suffix: '/sec',
      thousands: true,
      color: 'accent-blue',
    },
    { target: 20, label: 'Symbol Search', prefix: '<', suffix: 'ms', color: 'text' },
    { target: 4, label: 'Monthly Hosting', prefix: '<€', color: 'accent' },
  ];

  protected readonly techCategories: TechStackCategory[] = [
    {
      title: 'Frontend',
      skills: ['TypeScript', 'RxJS', 'NgRx', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap'],
    },
    {
      title: 'Backend & Data',
      skills: ['Node.js', 'Bun', 'Fastify', 'PostgreSQL', 'TimescaleDB', 'WebSockets'],
    },
    {
      title: 'Testing & Tooling',
      skills: ['Playwright', 'Electron', 'Docker', 'GitHub Actions', 'Figma', 'Postman'],
    },
  ];

  protected readonly secondaryProjects: ProjectCardData[] = [
    {
      org: 'Netcracker Technology · Team Project',
      title: 'B2B Self-Service Portal UI',
      description:
        'Customer- and CSR-facing telecom eCommerce portal with lazy-loaded Angular architecture and a multi-domain NgRx state layer.',
      tags: ['Angular', 'NgRx', 'RxJS', 'Playwright'],
    },
    {
      org: 'Netcracker Technology · Team Project',
      title: 'B2B Order Capture UI',
      description:
        'Enterprise order-management frontend with real-time WebSocket collaboration and a micro-frontend shell.',
      tags: ['Angular', 'NgRx', 'RxJS', 'LESS'],
    },
    {
      org: 'Academic Capstone',
      title: 'Citizen Centric Panchayat System',
      description:
        'Full-stack e-governance platform for rural citizen services, with payments and cloud document storage.',
      tags: ['React', 'Node.js', 'MongoDB', 'Razorpay'],
    },
  ];

  protected readonly careerNodes: CareerNode[] = [
    {
      year: '2018–2022',
      title: 'BE, Computer Science',
      org: 'Mangalore Institute of Technology & Engineering',
    },
    { year: '2021', title: 'Full-Stack Web Dev Intern', org: 'DevTown (formerly ShapeAI)' },
    { year: '2022–2024', title: 'Junior Software Engineer', org: 'Netcracker Technology' },
    { year: '2024–Present', title: 'Software Engineer', org: 'Netcracker Technology' },
    { year: '2025–Present', title: 'Building Garuda', org: 'Independent · Solo' },
  ];

  protected readonly testimonialPlaceholders: TestimonialPlaceholderData[] = [
    { secondaryBarWidth: '60%' },
    { secondaryBarWidth: '65%' },
    { secondaryBarWidth: '55%' },
  ];

  protected readonly typedText = signal('');
  protected readonly statsActive = signal(false);
  protected readonly garudaVisible = signal(false);
  protected readonly garudaDash = computed(() => (this.garudaVisible() ? '0' : '900'));

  protected readonly photoTransform = signal(
    'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)',
  );

  private roleIdx = 0;
  private charIdx = 0;
  private phase: 'typing' | 'deleting' = 'typing';
  private typeTimer: ReturnType<typeof setInterval> | undefined;
  private phaseTimer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    this.seo.setPageSeo({
      title: 'Vineeth Serigar — From Binary Packets to Pixel-Perfect UI',
      description:
        'Vineeth Serigar, software engineer. 4+ years building enterprise B2B UIs with Angular; solo-built Garuda, a real-time stock market analytics platform.',
      path: '/',
    });

    this.typeTimer = setInterval(() => this.tick(), TYPE_SPEED_MS);
    const statsTimer = setTimeout(() => this.statsActive.set(true), STATS_DELAY_MS);
    const garudaTimer = setTimeout(() => this.garudaVisible.set(true), GARUDA_REVEAL_DELAY_MS);

    this.destroyRef.onDestroy(() => {
      clearInterval(this.typeTimer);
      clearTimeout(this.phaseTimer);
      clearTimeout(statsTimer);
      clearTimeout(garudaTimer);
    });
  }

  protected onPhotoMouseMove(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    this.photoTransform.set(
      `perspective(900px) rotateX(${(-py * 9).toFixed(2)}deg) rotateY(${(px * 9).toFixed(2)}deg) scale(1.02)`,
    );
  }

  protected onPhotoMouseLeave(): void {
    this.photoTransform.set('perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)');
  }

  private tick(): void {
    const full = ROLES[this.roleIdx];

    if (this.phase === 'typing') {
      if (this.charIdx < full.length) {
        this.charIdx += 1;
        this.typedText.set(full.slice(0, this.charIdx));
        return;
      }

      clearInterval(this.typeTimer);
      this.phaseTimer = setTimeout(() => {
        this.phase = 'deleting';
        this.typeTimer = setInterval(() => this.tick(), DELETE_SPEED_MS);
      }, PAUSE_MS);
      return;
    }

    if (this.charIdx > 0) {
      this.charIdx -= 1;
      this.typedText.set(full.slice(0, this.charIdx));
      return;
    }

    clearInterval(this.typeTimer);
    this.roleIdx = (this.roleIdx + 1) % ROLES.length;
    this.phase = 'typing';
    this.typeTimer = setInterval(() => this.tick(), TYPE_SPEED_MS);
  }
}
