import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { SkillBadge, SkillBadgeComponent } from '../skill-badge/skill-badge';

export interface TechStackCategory {
  title: string;
  skills: string[];
}

@Component({
  selector: 'app-tech-stack-card',
  imports: [SkillBadgeComponent],
  templateUrl: './tech-stack-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackCardComponent {
  readonly category = input.required<TechStackCategory>();

  protected readonly badges = computed<SkillBadge[]>(() =>
    this.category().skills.map((label) => ({ label, size: 'md' })),
  );
}
