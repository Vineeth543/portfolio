import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

/* Must match the hero portrait src in home.html - the preload only helps if
   the browser cache key (URL) is identical. */
const HERO_IMAGE_SRC = '/assets/profile-vineeth.png';

const SESSION_KEY = 'preloader-shown';
const COUNT_DURATION_MS = 1500;
const IMAGE_TIMEOUT_MS = 5000;
const EXIT_DURATION_MS = 700;
const HOLD_AT_100_MS = 150;

@Injectable({ providedIn: 'root' })
export class PreloaderService {
  private readonly platformId = inject(PLATFORM_ID);

  /** Eased 0–100 integer shown by the counter. Simulated pacing; real gate below. */
  readonly progress = signal(0);
  /** Defaults to true so the overlay covers first paint; only ever flipped off. */
  readonly visible = signal(true);
  /** Drives the slide-up exit transition while the overlay is still mounted. */
  readonly exiting = signal(false);

  private started = false;

  start(): void {
    if (this.started || !isPlatformBrowser(this.platformId)) {
      return;
    }
    this.started = true;

    if (sessionStorage.getItem(SESSION_KEY) === 'true') {
      this.visible.set(false);
      return;
    }

    /* Kick off the hero fetch immediately - before HomeComponent's lazy chunk
       even resolves - so the <img> in the hero hits a warm cache. Resolves on
       load, on error, or at the hard ceiling; it can never hang the overlay. */
    const imageReady = new Promise<void>((resolve) => {
      const image = new Image();
      image.onload = (): void => resolve();
      image.onerror = (): void => resolve();
      image.src = HERO_IMAGE_SRC;
      setTimeout(resolve, IMAGE_TIMEOUT_MS);
    });

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      void imageReady.then(() => {
        this.progress.set(100);
        this.reveal(false);
      });
      return;
    }

    /* Ease-out cubic from 0 toward 99 over the fixed duration - fast start,
       settling in. Holds at 99 until the image gate opens. */
    const startTime = performance.now();
    const tick = (now: number): void => {
      const t = Math.min((now - startTime) / COUNT_DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      this.progress.set(Math.floor(eased * 99));
      if (t < 1) {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);

    const minimumElapsed = new Promise<void>((resolve) => setTimeout(resolve, COUNT_DURATION_MS));

    void Promise.all([imageReady, minimumElapsed]).then(() => {
      this.progress.set(100);
      this.reveal(true);
    });
  }

  private reveal(animated: boolean): void {
    if (!animated) {
      this.visible.set(false);
      sessionStorage.setItem(SESSION_KEY, 'true');
      return;
    }

    // A short beat at 100% so the final jump registers, then the exit slide.
    setTimeout(() => {
      this.exiting.set(true);
      setTimeout(() => {
        this.visible.set(false);
        sessionStorage.setItem(SESSION_KEY, 'true');
      }, EXIT_DURATION_MS);
    }, HOLD_AT_100_MS);
  }
}
