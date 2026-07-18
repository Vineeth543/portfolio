import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { SkillBadge, SkillBadgeComponent } from '../skill-badge/skill-badge';

export interface AdditionalProject {
  title: string;
  category: string;
  description: string;
  techStack: string[];
  screenshotPath: string;
  liveUrl?: string;
  githubUrl: string;
  linkedInUrl?: string;
}

@Component({
  selector: 'app-additional-project-card',
  imports: [SkillBadgeComponent],
  templateUrl: './additional-project-card.html',
  styleUrl: './additional-project-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalProjectCardComponent {
  readonly project = input.required<AdditionalProject>();

  protected readonly techBadges = computed<SkillBadge[]>(() =>
    this.project().techStack.map((label) => ({ label, size: 'sm' })),
  );
}
