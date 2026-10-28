import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'AStar Electricals | Powering Quality. Built on Trust. — Commercial Electrical Contracting',
    loadComponent: () =>
      import('./pages/home/home-page.component').then(m => m.HomePageComponent)
  },
  {
    path: 'about',
    title: 'About AStar Electricals | Commercial Built Environment Contracting',
    loadComponent: () =>
      import('./pages/about/about-page.component').then(m => m.AboutPageComponent)
  },
  {
    path: 'services',
    title: 'Commercial Electrical Services & Capabilities | AStar Electricals',
    loadComponent: () =>
      import('./pages/services/services-page.component').then(m => m.ServicesPageComponent)
  },
  {
    path: 'safety-quality',
    title: 'Safety, Quality & Site Standards | AStar Electricals',
    loadComponent: () =>
      import('./pages/safety-quality/safety-quality-page.component').then(
        m => m.SafetyQualityPageComponent
      )
  },
  {
    path: 'projects',
    title: 'Commercial Projects & Scope Execution | AStar Electricals',
    loadComponent: () =>
      import('./pages/projects/projects-page.component').then(m => m.ProjectsPageComponent)
  },
  {
    path: 'contact',
    title: 'Discuss Your Commercial Project | AStar Electricals',
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
