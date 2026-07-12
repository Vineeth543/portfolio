import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SkillBadge, SkillBadgeComponent } from '../skill-badge/skill-badge';

export interface ProjectCardData {
  org: string;
  title: string;
  description: string;
  tags: string[];
}

@Component({
  selector: 'app-project-card',
  imports: [RouterLink, SkillBadgeComponent],
  templateUrl: './project-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent {
  readonly project = input.required<ProjectCardData>();

  protected readonly tagBadges = computed<SkillBadge[]>(() =>
    this.project().tags.map((label) => ({ label, size: 'sm' })),
  );
}
