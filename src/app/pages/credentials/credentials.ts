import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  Credential,
  CredentialCardComponent,
} from '../../components/credential-card/credential-card';
import { ScrollReveal } from '../../shared/scroll-reveal.directive';

interface CpStat {
  value: string;
  label: string;
  accent?: boolean;
}

@Component({
  selector: 'app-credentials',
  imports: [RouterLink, ScrollReveal, CredentialCardComponent],
  templateUrl: './credentials.html',
  styleUrl: './credentials.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Credentials {
  protected readonly certificates: Credential[] = [
    {
      key: 'ibm',
      category: 'certificate',
      title: 'Introduction to Cybersecurity Tools & Cyber Attacks',
      issuer: 'IBM (via Coursera)',
      date: 'Sep 8, 2020',
      imageSrc: '/assets/certificate-ibm-cybersecurity.jpeg',
      imageAlt:
        'Introduction to Cybersecurity Tools & Cyber Attacks certificate from IBM via Coursera',
      linkUrl: 'https://www.coursera.org/account/accomplishments/verify/7ZEEKHTBYG7F',
      linkLabel: 'Verify Credential →',
    },
    {
      key: 'guvi',
      category: 'certificate',
      title: 'Robotic Process Automation',
      issuer: 'GUVI',
      date: 'Jun 1, 2020',
      imageSrc: '/assets/certificate-guvi-rpa.png',
      imageAlt: 'Robotic Process Automation certificate from GUVI',
      meta: 'Credential ID · 9TG19M215960DI64Wj',
      linkUrl: 'https://www.guvi.in/verify-certificate?id=9TG19M215960DI64Wj',
      linkLabel: 'Verify Credential →',
    },
    {
      key: 'hackerrank-ps',
      category: 'certificate',
      title: 'Problem Solving (Basic)',
      issuer: 'HackerRank',
      date: 'Jan 22, 2022',
      imageSrc: '/assets/certificate-hackerrank-problem-solving.jpg',
      imageAlt: 'Problem Solving (Basic) certificate from HackerRank',
      meta: 'Credential ID · 3D57D09990EB',
      linkUrl: 'https://www.hackerrank.com/certificates/3d57d09990eb',
      linkLabel: 'View Certificate →',
    },
    {
      key: 'devtown',
      category: 'certificate',
      title: 'Full Stack Web Development',
      issuer: 'DevTown (formerly ShapeAI)',
      date: 'Summer 2021',
      imageSrc: '/assets/certificate-devtown-shapeai.jpg',
      imageAlt: 'Full Stack Web Development certificate from DevTown (formerly ShapeAI)',
      linkUrl: 'https://drive.google.com/file/d/18iMAPFcm8XhqxpQntBg6E5iAlHcUgLpM',
      linkLabel: 'View Certificate →',
    },
  ];

  protected readonly awards: Credential[] = [
    {
      key: 'difference',
      category: 'award',
      title: '"You’ve Made The Difference"',
      issuer: 'Netcracker Technology',
      date: 'March 2024',
      imageSrc: '/assets/award-netcracker-difference.jpg',
      imageAlt: '"You’ve Made The Difference" award certificate from Netcracker Technology',
      description:
        'An internal recognition award for consistently delivering exceptional value to customers and stakeholders — a formal performance incentive recognizing individual contribution, approved at the organizational level.',
    },
    {
      key: 'stepathon',
      category: 'award',
      title: 'Stepathon 2024 — Walk to Wellness',
      issuer: 'Netcracker Technology',
      date: '2024',
      customVisual: 'stepathon',
      description:
        "Part of the winning 10-member team in Netcracker India's company-wide wellness challenge, blending daily step goals with team-based friendly competition.",
    },
  ];

  protected readonly codechefStats: CpStat[] = [
    { value: '2★', label: 'Division 3', accent: true },
    { value: '1570', label: 'Peak rating' },
    { value: '28', label: 'Problems solved' },
  ];
}
