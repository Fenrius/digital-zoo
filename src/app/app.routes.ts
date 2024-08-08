import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'animal-overview',
  },
  {
    path: 'animal-overview',
    loadComponent: () =>
      import('./components/overview-page/overview-page.component').then(
        m => m.OverviewPageComponent
      )
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/not-found-page/not-found-page.component').then(
        m => m.NotFoundPageComponent
      )
  }
];
