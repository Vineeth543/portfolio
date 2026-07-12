import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface SocialLink {
  label: string;
  href: string;
}

interface FooterLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
})
export class Footer {
  protected readonly socialLinks: SocialLink[] = [
    { label: 'Website', href: 'https://www.vineeth.software' },
    { label: 'GitHub', href: 'https://github.com/Vineeth543' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vineeth-serigar' },
    { label: 'HackerRank', href: 'https://www.hackerrank.com/profile/vineethserigar17' },
    { label: 'CodeChef', href: 'https://www.codechef.com/users/avenger17' },
  ];

  protected readonly footerNav: FooterLink[] = [
    { label: 'Work', path: '/work' },
    { label: 'Garuda', path: '/garuda' },
    { label: 'Experience', path: '/experience' },
    { label: 'About', path: '/about' },
    { label: 'Credentials', path: '/credentials' },
    { label: 'Contact', path: '/contact' },
    { label: 'Journal', path: '/journal' },
  ];
}
