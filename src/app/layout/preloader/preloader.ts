import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { PreloaderService } from '../../core/preloader.service';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Preloader {
  protected readonly preloader = inject(PreloaderService);

  constructor() {
    // Root-level component: constructed once per hard page load, never on
    // client-side route navigation, so the sequence can't re-trigger.
    this.preloader.start();
  }
}
