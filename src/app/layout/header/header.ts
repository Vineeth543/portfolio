import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { ThemeService } from '../../core/theme.service';
import { RESUME_DOWNLOAD_FILENAME, RESUME_PATH } from '../../shared/resume.constant';

interface NavLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
})
export class Header {
  protected readonly themeService = inject(ThemeService);

  protected readonly navLinks: NavLink[] = [
    { label: 'Work', path: '/work' },
    { label: 'Garuda', path: '/garuda' },
    { label: 'Experience', path: '/experience' },
    { label: 'About', path: '/about' },
    { label: 'Credentials', path: '/credentials' },
    { label: 'Contact', path: '/contact' },
  ];

  protected readonly mobileMenuOpen = signal(false);

  protected readonly resumePath: string = RESUME_PATH;
  protected readonly resumeFilename: string = RESUME_DOWNLOAD_FILENAME;

  protected readonly thumbPos = computed(() =>
    this.themeService.theme() === 'dark' ? '2px' : '22px',
  );
  protected readonly thumbRotate = computed(() =>
    this.themeService.theme() === 'dark' ? 'rotate(0deg)' : 'rotate(180deg)',
  );
  protected readonly knobSunOpacity = computed(() => (this.themeService.theme() === 'dark' ? 0 : 1));
  protected readonly knobMoonOpacity = computed(() => (this.themeService.theme() === 'dark' ? 1 : 0));
  protected readonly themeToggleLabel = computed(() =>
    this.themeService.theme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
  );

  protected toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
