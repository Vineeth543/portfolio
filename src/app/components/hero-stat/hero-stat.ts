import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface HeroStat {
  value: string;
  label: string;
}

@Component({
  selector: 'app-hero-stat',
  templateUrl: './hero-stat.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroStatComponent {
  readonly stat = input.required<HeroStat>();
}
