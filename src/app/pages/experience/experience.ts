import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  ExperienceEntry,
  ExperienceEntryComponent,
} from '../../components/experience-entry/experience-entry';
import { ScrollReveal } from '../../shared/scroll-reveal.directive';

interface HighlightStat {
  stat: string;
  label: string;
}

@Component({
  selector: 'app-experience',
  imports: [RouterLink, ScrollReveal, ExperienceEntryComponent],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Experience {
  protected readonly highlights: HighlightStat[] = [
    { stat: '4', label: 'Years professional experience' },
    { stat: '2', label: 'Enterprise B2B products shipped' },
    { stat: '30%', label: 'Engagement lift from smart search' },
    { stat: '1', label: 'Solo-built flagship platform' },
  ];

  protected readonly entries: ExperienceEntry[] = [
    {
      key: 'education',
      range: 'Aug 2018 – Jul 2022',
      badge: 'Education',
      title: 'BE, Computer Science & Engineering',
      org: 'Mangalore Institute of Technology & Engineering · GPA 7.93/10',
      teaser:
        'Foundational degree covering core CS, culminating in a full-stack capstone: a citizen-services e-governance platform.',
      bullets: [
        'Final-year capstone: Citizen Centric Panchayat System — a full-stack e-governance platform (React, Node/Express, MongoDB, Razorpay, AWS S3).',
        'Practiced competitive programming on CodeChef and HackerRank alongside coursework.',
      ],
      tags: ['Computer Science', 'Data Structures', 'DBMS'],
      dotColor: 'accent',
      linkLabel: 'See the capstone project',
      linkHref: '/work',
    },
    {
      key: 'devtown',
      range: 'Summer 2021',
      badge: 'Internship',
      title: 'Full Stack Web Developer Intern',
      org: 'DevTown (formerly ShapeAI)',
      teaser:
        'An intensive, project-driven internship — front-end fundamentals through React.js, shipping a series of deployed applications.',
      bullets: [
        'Built responsive front-end projects with HTML5, CSS3 and JavaScript (ES6) — control statements, promises, and async/await — plus Bootstrap, React.js (components, state, props, Router) and Tailwind CSS.',
        'Delivered a series of applied projects deployed via GitHub Pages: a Netflix-style responsive clone, a Zomato-style landing page, a DOM-driven task-management app, and a capstone "Book My Show" React clone integrating the IMDB API and Razorpay.',
        'Gained hands-on experience calling REST APIs from React, with an introductory conceptual view into Node.js and MongoDB.',
        'Participated in weekly progress check-ins with trainers, strengthening structured, feedback-driven problem-solving.',
      ],
      tags: ['HTML5', 'CSS3', 'JavaScript (ES6)', 'React.js', 'Tailwind CSS', 'Bootstrap'],
      dotColor: 'accent',
    },
    {
      key: 'netcracker1',
      range: 'Sep 2022 – Jul 2024',
      badge: 'Full-Time',
      title: 'Junior Software Engineer',
      org: 'Netcracker Technology · B2B Order Capture UI',
      teaser:
        'An enterprise order-management frontend for quote creation, catalog browsing, and multi-step checkout — built and shipped as part of a delivery team.',
      bullets: [
        'Contributed to a multi-session NgRx state architecture with persistence middleware, reducing session-recovery time to near-zero.',
        'Helped build a real-time WebSocket-based notification system using RxJS, enabling multiple users to collaborate on shared quotes concurrently without a manual refresh.',
        'Contributed to a centralized HTTP error-handling layer that consistently surfaced server-side errors as real-time toast notifications.',
        'Helped implement a micro-frontend shell enabling this UI to embed within a parent portal, with dynamic configuration and unsaved-changes protection.',
      ],
      tags: ['Angular', 'TypeScript', 'NgRx', 'RxJS', 'LESS', 'Playwright'],
      dotColor: 'accent',
    },
    {
      key: 'netcracker2',
      range: 'Aug 2024 – Present',
      badge: 'Full-Time · Current',
      title: 'Software Engineer',
      org: 'Netcracker Technology · B2B Self-Service Portal UI',
      teaser:
        'A customer- and CSR-facing telecom eCommerce/eCare portal — catalog browsing, offer configuration, billing, and self-service quoting.',
      bullets: [
        'Contributed to a modular Angular SPA with lazy-loaded routing split across public and private route trees with authentication-based route guarding.',
        'Contributed to a large, multi-domain NgRx global state architecture with cross-session persistence via meta-reducers, eliminating redundant API re-fetches.',
        'Helped implement a smart product search (NgRx selectors plus reactive input streaming) delivering sub-second catalog search and a 30% increase in user engagement.',
        'Helped build Playwright end-to-end test automation across major user journeys, contributing to a stable, low-flake CI pipeline.',
        'Contributed to role-aware dynamic navigation supporting multiple user roles and permission levels.',
      ],
      tags: ['Angular', 'TypeScript', 'NgRx', 'RxJS', 'Bootstrap', 'Playwright'],
      dotColor: 'accent',
      defaultOpen: true,
    },
    {
      key: 'garuda',
      range: 'Feb 2025 – Present',
      badge: 'Independent · Solo',
      title: 'Building Garuda',
      org: 'Real-Time Indian Stock Market Analytics Platform',
      teaser:
        'Architected, built, and operate a complete real-time analytics platform solo — frontend, backend, data pipeline, security, and infrastructure.',
      bullets: [],
      tags: ['Angular 21', 'Electron', 'Bun', 'Fastify', 'TimescaleDB'],
      dotColor: 'accent-blue',
      linkLabel: 'Read the full case study',
      linkHref: '/garuda',
    },
  ];
}
