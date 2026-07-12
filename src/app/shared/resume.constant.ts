/* Single source of truth for the resume download, referenced by the header
   and contact-page buttons so the two can never drift apart. */

/** Where the file physically lives under public/ (served as-is at the site root). */
export const RESUME_PATH: string = '/assets/Vineeth_Serigar_Resume_Angular.pdf';

/** Exact filename the browser saves the download as, via the anchor `download` attribute. */
export const RESUME_DOWNLOAD_FILENAME: string = 'Vineeth_Serigar_Resume.pdf';
