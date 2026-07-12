import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface HighlightCardData {
  tag: string;
  title: string;
  desc: string;
}

@Component({
  selector: 'app-highlight-card',
  templateUrl: './highlight-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HighlightCardComponent {
  readonly highlight = input.required<HighlightCardData>();
}
