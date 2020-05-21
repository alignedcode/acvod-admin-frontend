import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'layout',
        loadChildren: () =>
          import('./layout/layout.module').then(
            (module) => module.LayoutModule,
          ),
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./forms/forms.module').then((module) => module.FormsModule),
      },
      {
        path: 'ui-features',
        loadChildren: () =>
          import('./ui-features/ui-features.module').then(
            (module) => module.UiFeaturesModule,
          ),
      },
      {
        path: 'modal-overlays',
        loadChildren: () =>
          import('./modal-overlays/modal-overlays.module').then(
            (module) => module.ModalOverlaysModule,
          ),
      },
      {
        path: 'extra-components',
        loadChildren: () =>
          import('./extra-components/extra-components.module').then(
            (module) => module.ExtraComponentsModule,
          ),
      },
      {
        path: 'miscellaneous',
        loadChildren: () =>
          import('./miscellaneous/miscellaneous.module').then(
            (module) => module.MiscellaneousModule,
          ),
      },
      {
        path: '',
        redirectTo: 'layout',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
