import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type CredentialCategory = 'certificate' | 'award';

export interface Credential {
  key: string;
  category: CredentialCategory;
  title: string;
  issuer: string;
  date: string;
  imageSrc?: string;
  imageAlt?: string;
  initials?: string;
  monoBg?: string;
  /* Opt-in decorative artwork for entries with no certificate image; the
     initials badge stays the generic fallback for everything else. */
  customVisual?: 'stepathon';
  meta?: string;
  description?: string;
  linkUrl?: string;
  linkLabel?: string;
}

const IMAGE_HEIGHT: Record<CredentialCategory, string> = {
  certificate: 'h-[220px]',
  award: 'h-[300px]',
};

const FALLBACK_HEIGHT: Record<CredentialCategory, string> = {
  certificate: 'h-[220px]',
  award: 'h-[120px]',
};

const IMAGE_PADDING: Record<CredentialCategory, string> = {
  certificate: 'p-4.5',
  award: 'p-5',
};

const IMAGE_INNER_CLASSES: Record<CredentialCategory, string> = {
  certificate:
    'rounded-[6px] shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.045]',
  award: 'rounded-[8px] shadow-[0_12px_32px_rgba(0,0,0,0.3)]',
};

const BADGE_CLASSES: Record<CredentialCategory, string> = {
  certificate: 'h-16 w-16 rounded-icon text-xl',
  award: 'h-14 w-14 rounded-[14px] text-lg',
};

const CONTENT_PADDING: Record<CredentialCategory, string> = {
  certificate: 'p-6',
  award: 'p-7',
};

const TITLE_CLASSES: Record<CredentialCategory, string> = {
  certificate: 'mb-2 text-base',
  award: 'mb-3 text-[19px]',
};

@Component({
  selector: 'app-credential-card',
  templateUrl: './credential-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CredentialCardComponent {
  readonly credential = input.required<Credential>();

  protected readonly imageHeightClass = computed(() => IMAGE_HEIGHT[this.credential().category]);
  protected readonly fallbackHeightClass = computed(
    () => FALLBACK_HEIGHT[this.credential().category],
  );
  protected readonly imagePaddingClass = computed(() => IMAGE_PADDING[this.credential().category]);
  protected readonly imageInnerClasses = computed(
    () => IMAGE_INNER_CLASSES[this.credential().category],
  );
  protected readonly badgeClasses = computed(() => BADGE_CLASSES[this.credential().category]);
  protected readonly contentPaddingClass = computed(
    () => CONTENT_PADDING[this.credential().category],
  );
  protected readonly titleClasses = computed(() => TITLE_CLASSES[this.credential().category]);
}
