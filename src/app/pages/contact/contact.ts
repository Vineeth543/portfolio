import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { environment } from '../../../environments/environment';
import { FaqItem, FaqItemComponent } from '../../components/faq-item/faq-item';
import { SeoService } from '../../core/seo.service';
import { RESUME_DOWNLOAD_FILENAME, RESUME_PATH } from '../../shared/resume.constant';
import { ScrollReveal } from '../../shared/scroll-reveal.directive';

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

interface ContactApiResponse {
  success: boolean;
  error?: string;
}

interface SocialLink {
  label: string;
  href: string;
}

const FIELD_BASE_CLASSES =
  'w-full box-border rounded-[14px] border-[1.5px] bg-bg-alt px-4 py-[13px] font-sans text-[14.5px] font-medium text-text outline-none transition-[border-color,box-shadow] duration-250 placeholder:text-text-tertiary focus:border-accent focus:shadow-[0_0_0_4px_rgba(255,90,70,0.14)] disabled:opacity-60';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, ScrollReveal, FaqItemComponent],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  private readonly http = inject(HttpClient);
  private readonly seo = inject(SeoService);

  protected readonly form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    subject: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    message: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)],
    }),
    company: new FormControl('', { nonNullable: true }),
  });

  protected readonly status = signal<SubmitStatus>('idle');
  protected readonly showValidationBanner = signal(false);

  protected readonly resumePath: string = RESUME_PATH;
  protected readonly resumeFilename: string = RESUME_DOWNLOAD_FILENAME;

  protected readonly socialLinks: SocialLink[] = [
    { label: 'Website', href: 'https://www.vineeth.software' },
    { label: 'GitHub', href: 'https://github.com/Vineeth543' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vineeth-serigar' },
    { label: 'HackerRank', href: 'https://www.hackerrank.com/profile/vineethserigar17' },
    { label: 'CodeChef', href: 'https://www.codechef.com/users/avenger17' },
  ];

  protected readonly faqs: FaqItem[] = [
    {
      key: 'roles',
      question: 'What roles are you looking for?',
      answer: 'Angular Developer, Frontend Developer, and Full-Stack Developer roles.',
      defaultOpen: true,
    },
    {
      key: 'location',
      question: 'Where are you based, and are you open to remote?',
      answer:
        "Bengaluru, India. I'm primarily targeting Bengaluru, and I'm also open to remote work.",
    },
    {
      key: 'stack',
      question: "What's your core tech stack?",
      answer:
        'Angular, TypeScript, RxJS and NgRx on the frontend; Node.js, Bun, Fastify, PostgreSQL/TimescaleDB and WebSockets on the backend; Playwright for end-to-end testing.',
    },
    {
      key: 'experience',
      question: 'How much experience do you have?',
      answer: 'About four years of professional experience, since September 2022.',
    },
    {
      key: 'teamwork',
      question: 'How do you work in a team?',
      answer:
        "Agile/Scrum with sprint planning and Jira - I've spent my career contributing within teams of 5–6 engineers on enterprise products.",
    },
    {
      key: 'ai',
      question: 'Do you use AI tools?',
      answer:
        'Yes - Claude Code, GitHub Copilot, Cursor, Codex and Antigravity, as productivity accelerants while keeping quality ownership.',
    },
    {
      key: 'fullstack',
      question: 'Can you work full-stack, or frontend only?',
      answer:
        'Frontend is my core strength, but I independently design and operate full-stack systems - see Garuda.',
    },
  ];

  constructor() {
    this.seo.setPageSeo({
      title: 'Contact | Vineeth Serigar',
      description:
        'Get in touch with Vineeth Serigar, a Bengaluru-based software engineer open to Angular, frontend, and full-stack opportunities.',
      path: '/contact',
    });
  }

  protected fieldClasses(controlName: 'name' | 'email' | 'subject' | 'message'): string {
    const control = this.form.controls[controlName];
    const showError = control.invalid && control.touched;
    return `${FIELD_BASE_CLASSES} ${showError ? 'border-accent' : 'border-border'}`;
  }

  protected showFieldError(controlName: 'name' | 'email' | 'subject' | 'message'): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && control.touched;
  }

  protected submit(): void {
    if (this.status() === 'submitting') {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.showValidationBanner.set(true);
      return;
    }

    this.showValidationBanner.set(false);
    this.status.set('submitting');
    const payload = this.form.getRawValue();
    this.form.disable();

    this.http.post<ContactApiResponse>(environment.contactApiUrl, payload).subscribe({
      next: (response) => {
        this.form.enable();
        if (response.success) {
          this.form.reset();
          this.status.set('success');
        } else {
          this.status.set('error');
        }
      },
      error: () => {
        this.form.enable();
        this.status.set('error');
      },
    });
  }

  protected resetForm(): void {
    this.form.reset();
    this.showValidationBanner.set(false);
    this.status.set('idle');
  }
}
