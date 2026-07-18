import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SkillBadge, SkillBadgeComponent } from '../../components/skill-badge/skill-badge';
import { SeoService } from '../../core/seo.service';
import { ScrollReveal } from '../../shared/scroll-reveal.directive';

interface GlanceItem {
  label: string;
  value: string;
  accent?: boolean;
}

interface JourneyStep {
  year: string;
  title: string;
  desc: string;
}

interface Proficiency {
  name: string;
  level: string;
  pct: string;
}

interface PhilosophyPrinciple {
  num: string;
  title: string;
  desc: string;
}

interface FunFact {
  tag: string;
  text: string;
}

@Component({
  selector: 'app-about',
  imports: [RouterLink, ScrollReveal, SkillBadgeComponent],
  templateUrl: './about.html',
  styleUrl: './about.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  private readonly seo = inject(SeoService);

  protected readonly glanceItems: GlanceItem[] = [
    { label: 'Location', value: 'Bengaluru, India' },
    { label: 'Experience', value: '~4 years' },
    { label: 'Core Stack', value: 'Angular · TS · NgRx · RxJS' },
    { label: 'Open To', value: 'Bengaluru / Remote', accent: true },
  ];

  protected readonly journeySteps: JourneyStep[] = [
    {
      year: '2018–2022',
      title: 'Foundations',
      desc: 'Studied Computer Science and Engineering at Mangalore Institute of Technology & Engineering, graduating with a 7.93/10 GPA, and built a full-stack citizen-services capstone.',
    },
    {
      year: '2021',
      title: 'First lines shipped',
      desc: 'A Full Stack Web Developer internship at DevTown took me from HTML/CSS/JS fundamentals through React.js and Tailwind CSS, deploying real projects along the way.',
    },
    {
      year: '2022',
      title: 'Entering industry',
      desc: 'Joined Netcracker Technology in Bengaluru as a Junior Software Engineer, contributing to a B2B order-capture frontend.',
    },
    {
      year: '2024–Present',
      title: 'Growth',
      desc: 'Progressed to Software Engineer, contributing to a customer-facing B2B self-service telecom portal alongside a team of engineers.',
    },
    {
      year: '2025–Present',
      title: 'Independent mastery',
      desc: 'Began building Garuda, a solo flagship real-time analytics platform showcasing end-to-end engineering - frontend, backend, systems design, security and DevOps.',
    },
  ];

  protected readonly proficiencies: Proficiency[] = [
    { name: 'Angular / TypeScript / RxJS', level: 'Expert', pct: '96%' },
    { name: 'NgRx State Architecture', level: 'Expert', pct: '94%' },
    { name: 'Full-Stack (Node / Bun / Fastify)', level: 'Advanced', pct: '80%' },
    { name: 'PostgreSQL / TimescaleDB', level: 'Advanced', pct: '78%' },
    { name: 'Playwright E2E Testing', level: 'Advanced', pct: '80%' },
    { name: 'Electron Desktop Apps', level: 'Advanced', pct: '76%' },
    { name: 'Security Engineering', level: 'Advanced', pct: '75%' },
    { name: 'DevOps / Self-Hosting', level: 'Intermediate–Advanced', pct: '65%' },
    { name: 'React', level: 'Working / Growth', pct: '40%' },
  ];

  protected readonly philosophy: PhilosophyPrinciple[] = [
    {
      num: '01',
      title: 'Performance is a feature',
      desc: 'Sub-second search, sub-millisecond reads, and gap-free real-time updates aren’t extras - they’re the product.',
    },
    {
      num: '02',
      title: 'Build for resilience',
      desc: 'Systems fail; good engineering degrades gracefully. Write-ahead fallbacks and stateless reconnection keep data safe.',
    },
    {
      num: '03',
      title: 'Architecture that scales cleanly',
      desc: 'Modular SPAs, well-structured state, and clear separation of concerns make software maintainable as it grows.',
    },
    {
      num: '04',
      title: 'Test what matters',
      desc: 'Stable, low-flake end-to-end coverage of real user journeys buys real confidence.',
    },
    {
      num: '05',
      title: 'Cost-efficiency is craftsmanship',
      desc: 'Running a full real-time platform for under €4/month is a design achievement, not an accident.',
    },
    {
      num: '06',
      title: 'Leverage AI, own the quality',
      desc: 'AI tools accelerate my velocity; the engineering judgment and the standard of the output stay mine.',
    },
  ];

  protected readonly growthAreas: SkillBadge[] = [
    { label: 'Deeper React seniority', variant: 'dashed', size: 'lg' },
    { label: 'Karma / Jasmine', variant: 'dashed', size: 'lg' },
    { label: 'Java / Spring Boot', variant: 'dashed', size: 'lg' },
    { label: 'Cloud architecture (AWS/GCP)', variant: 'dashed', size: 'lg' },
    { label: 'ORM frameworks', variant: 'dashed', size: 'lg' },
    { label: 'Kubernetes', variant: 'dashed', size: 'lg' },
    { label: 'User-behavior analytics', variant: 'dashed', size: 'lg' },
  ];

  protected readonly funFacts: FunFact[] = [
    {
      tag: 'Competitive Programmer',
      text: 'Active on CodeChef (handle avenger17, 2★, peak rating 1570) and HackerRank (vineethserigar17).',
    },
    {
      tag: 'Ships Lean',
      text: 'Runs a full real-time market-analytics platform for under €4/month.',
    },
    {
      tag: 'Binary Tinkerer',
      text: 'Decodes ~1,500 market-data packets per second by hand in pure TypeScript.',
    },
    { tag: 'Off the Clock', text: 'Traveling, hiking, and exploring nature.' },
    { tag: 'Handle Origin', text: 'Goes by "avenger17" on CodeChef.' },
  ];

  constructor() {
    this.seo.setPageSeo({
      title: 'About | Vineeth Serigar',
      description:
        'Angular-focused software engineer based in Bengaluru - background, engineering philosophy, and the path from a full-stack capstone to Garuda.',
      path: '/about',
    });
  }
}
