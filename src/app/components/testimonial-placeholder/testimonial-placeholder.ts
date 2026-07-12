import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface TestimonialPlaceholderData {
  secondaryBarWidth: string;
}

@Component({
  selector: 'app-testimonial-placeholder',
  templateUrl: './testimonial-placeholder.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialPlaceholderComponent {
  readonly data = input.required<TestimonialPlaceholderData>();
}
