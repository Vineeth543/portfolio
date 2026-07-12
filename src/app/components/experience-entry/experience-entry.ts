import { ChangeDetectionStrategy, Component, computed, input, linkedSignal } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface ExperienceEntry {
  key: string;
  range: string;
  badge: string;
  title: string;
  org: string;
  teaser: string;
  bullets: string[];
  tags: string[];
  dotColor: 'accent' | 'accent-blue';
  linkLabel?: string;
  linkHref?: string;
  defaultOpen?: boolean;
}

@Component({
  selector: 'app-experience-entry',
  imports: [RouterLink],
  templateUrl: './experience-entry.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceEntryComponent {
  readonly entry = input.required<ExperienceEntry>();

  protected readonly expanded = linkedSignal(() => this.entry().defaultOpen ?? false);

  protected readonly dotClasses = computed(() =>
    this.entry().dotColor === 'accent-blue' ? 'bg-accent-blue' : 'bg-accent',
  );

  protected toggle(): void {
    this.expanded.update((open) => !open);
  }
}
