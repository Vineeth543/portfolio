import { Directive, DestroyRef, ElementRef, afterNextRender, inject, signal } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  host: {
    '[style.opacity]': 'revealed() ? 1 : 0',
    '[style.transform]': "revealed() ? 'translateY(0)' : 'translateY(28px)'",
    '[style.transition]':
      "'opacity 0.9s cubic-bezier(.16,1,.3,1), transform 0.9s cubic-bezier(.16,1,.3,1)'",
  },
})
export class ScrollReveal {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly revealed = signal(false);

  constructor() {
    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.revealed.set(true);
        return;
      }

      // threshold 0, not a fraction: a fractional threshold is measured against the host's
      // own height, so a tall host (e.g. a stretched flex column) can sit partly in the
      // initial viewport yet never reach the fraction until the user scrolls.
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.revealed.set(true);
              observer.unobserve(entry.target);
            }
          }
        },
        { threshold: 0, rootMargin: '0px 0px -40px 0px' },
      );
      observer.observe(this.elementRef.nativeElement);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
