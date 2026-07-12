import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type SkillBadgeVariant = 'filled' | 'outline' | 'dashed';
export type SkillBadgeSize = 'lg' | 'md' | 'sm';

export interface SkillBadge {
  label: string;
  variant?: SkillBadgeVariant;
  size?: SkillBadgeSize;
}

const SIZE_CLASSES: Record<SkillBadgeSize, string> = {
  lg: 'px-5 py-2.75 text-sm',
  md: 'px-3.5 py-2 text-[13px]',
  sm: 'px-2.75 py-1.25 text-[11px]',
};

const VARIANT_CLASSES: Record<SkillBadgeVariant, string> = {
  filled: 'bg-accent font-bold text-white',
  outline: 'border border-border font-medium text-text-secondary',
  dashed: 'border border-dashed border-border-strong font-medium text-text-secondary',
};

@Component({
  selector: 'app-skill-badge',
  templateUrl: './skill-badge.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillBadgeComponent {
  readonly badge = input.required<SkillBadge>();

  protected readonly classes = computed(
    () =>
      `${SIZE_CLASSES[this.badge().size ?? 'md']} ${VARIANT_CLASSES[this.badge().variant ?? 'outline']}`,
  );
}
