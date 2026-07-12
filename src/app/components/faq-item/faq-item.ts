import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

export interface FaqItem {
  key: string;
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

@Component({
  selector: 'app-faq-item',
  templateUrl: './faq-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqItemComponent {
  readonly faq = input.required<FaqItem>();

  protected readonly open = linkedSignal(() => this.faq().defaultOpen ?? false);

  protected toggle(): void {
    this.open.update((isOpen) => !isOpen);
  }
}
