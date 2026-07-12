import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type FlowStageKind = 'edge' | 'normal' | 'black';

export interface FlowStageData {
  title: string;
  sub: string;
  kind: FlowStageKind;
}

const BOX_CLASSES: Record<FlowStageKind, string> = {
  edge: 'bg-bg-alt border-border',
  normal: 'bg-surface border-border',
  black: 'bg-[rgba(255,75,62,0.06)] border-[rgba(255,75,62,0.3)]',
};

@Component({
  selector: 'app-flow-stage',
  host: { class: 'contents' },
  templateUrl: './flow-stage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlowStageComponent {
  readonly stage = input.required<FlowStageData>();
  readonly last = input(false);

  protected readonly boxClasses = computed(() => BOX_CLASSES[this.stage().kind]);
  protected readonly titleColorClass = computed(() =>
    this.stage().kind === 'black' ? 'text-accent' : 'text-text',
  );
}
