import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'AStar Electricals | Commercial Electrical Contracting',
    loadComponent: () =>
      import('./pages/home/home-page.component').then(m => m.HomePageComponent)
  },
  {
    path: 'about',
    title: 'About AStar Electricals | Commercial Electrical Contractors',
    loadComponent: () =>
      import('./pages/about/about-page.component').then(m => m.AboutPageComponent)
  },
  {
    path: 'services',
    title: 'Commercial Electrical Contracting Services | AStar',
    loadComponent: () =>
      import('./pages/services/services-page.component').then(m => m.ServicesPageComponent)
  },
  {
    path: 'safety-quality',
    title: 'Safety and Quality | AStar Electricals',
    loadComponent: () =>
      import('./pages/safety-quality/safety-quality-page.component').then(
        m => m.SafetyQualityPageComponent
      )
  },
  {
    path: 'projects',
    title: 'Commercial Electrical Projects | AStar Electricals',
    loadComponent: () =>
      import('./pages/projects/projects-page.component').then(m => m.ProjectsPageComponent)
  },
  {
    path: 'contact',
    title: 'Contact AStar Electricals | Project Inquiries',
    loadComponent: () =>
      import('./pages/contact/contact-page.component').then(m => m.ContactPageComponent)
  },
  {
    path: '404',
    title: 'Page Not Found | AStar Electricals',
    loadComponent: () =>
      import('./pages/not-found/not-found-page.component').then(m => m.NotFoundPageComponent)
  },
  {
    path: '**',
    redirectTo: '404'
  }
];
