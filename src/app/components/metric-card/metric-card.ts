import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface MetricCardData {
  display: string;
  label: string;
  sub: string;
}

@Component({
  selector: 'app-metric-card',
  templateUrl: './metric-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetricCardComponent {
  readonly metric = input.required<MetricCardData>();
}
