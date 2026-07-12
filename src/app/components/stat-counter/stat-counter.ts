import { ChangeDetectionStrategy, Component, DestroyRef, computed, effect, inject, input, signal } from '@angular/core';

export type StatCounterColor = 'text' | 'accent' | 'accent-blue';

export interface StatCounterData {
  target: number;
  label: string;
  prefix?: string;
  suffix?: string;
  thousands?: boolean;
  color?: StatCounterColor;
}

const DURATION_MS = 1300;

const COLOR_CLASSES: Record<StatCounterColor, string> = {
  text: 'text-text',
  accent: 'text-accent',
  'accent-blue': 'text-accent-blue',
};

@Component({
  selector: 'app-stat-counter',
  templateUrl: './stat-counter.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatCounterComponent {
  readonly stat = input.required<StatCounterData>();
  readonly active = input(false);

  private readonly destroyRef = inject(DestroyRef);
  private readonly current = signal(0);
  private started = false;
  private rafId: number | null = null;

  protected readonly colorClass = computed(() => COLOR_CLASSES[this.stat().color ?? 'text']);
  protected readonly display = computed(() => {
    const value = Math.round(this.current());
    const formatted = this.stat().thousands ? value.toLocaleString() : String(value);
    return `${this.stat().prefix ?? ''}${formatted}${this.stat().suffix ?? ''}`;
  });

  constructor() {
    effect(() => {
      if (!this.active() || this.started) return;
      this.started = true;
      this.runCountUp();
    });

    this.destroyRef.onDestroy(() => {
      if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    });
  }

  private runCountUp(): void {
    const target = this.stat().target;
    const start = performance.now();

    const frame = (now: number): void => {
      const progress = Math.min(1, (now - start) / DURATION_MS);
      const eased = 1 - Math.pow(1 - progress, 3);
      this.current.set(target * eased);
      this.rafId = progress < 1 ? requestAnimationFrame(frame) : null;
    };

    this.rafId = requestAnimationFrame(frame);
  }
}
