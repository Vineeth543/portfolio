import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type ProjectMotif = 'grid' | 'flow' | 'radial';

export interface Project {
  key: string;
  org: string;
  timeframe: string;
  title: string;
  overview: string;
  bullets: string[];
  tags: string[];
  note: string;
  motif: ProjectMotif;
}

interface MotifNode {
  x: number;
  y: number;
  delay: number;
}

const RADIAL_POSITIONS: ReadonlyArray<readonly [number, number]> = [
  [120, 40],
  [195, 85],
  [195, 155],
  [120, 200],
  [45, 155],
  [45, 85],
];

@Component({
  selector: 'app-work-project-card',
  templateUrl: './work-project-card.html',
  styleUrl: './work-project-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkProjectCardComponent {
  readonly project = input.required<Project>();

  protected readonly gridCells = computed<MotifNode[]>(() => {
    if (this.project().motif !== 'grid') return [];
    const cells: MotifNode[] = [];
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        cells.push({ x: col * 44 + 10, y: row * 44 + 10, delay: (row + col) * 0.15 });
      }
    }
    return cells;
  });

  protected readonly radialNodes = computed<MotifNode[]>(() =>
    this.project().motif === 'radial'
      ? RADIAL_POSITIONS.map(([x, y], i) => ({ x, y, delay: i * 0.25 }))
      : [],
  );
}
