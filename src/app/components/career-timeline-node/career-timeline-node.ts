import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface CareerNode {
  year: string;
  title: string;
  org: string;
}

@Component({
  selector: 'app-career-timeline-node',
  templateUrl: './career-timeline-node.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CareerTimelineNodeComponent {
  readonly node = input.required<CareerNode>();
}
