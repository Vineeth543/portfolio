import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then((m) => m.Home) },
  { path: 'work', loadComponent: () => import('./pages/work/work').then((m) => m.Work) },
  {
    path: 'garuda',
    loadComponent: () => import('./pages/work/garuda/garuda').then((m) => m.Garuda),
  },
  {
    path: 'experience',
    loadComponent: () => import('./pages/experience/experience').then((m) => m.Experience),
  },
  { path: 'about', loadComponent: () => import('./pages/about/about').then((m) => m.About) },
  {
    path: 'credentials',
    loadComponent: () => import('./pages/credentials/credentials').then((m) => m.Credentials),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
  },
];
