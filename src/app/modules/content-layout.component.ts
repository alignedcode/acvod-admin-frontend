import { Component } from '@angular/core';

import { MENU_ITEMS } from './content-layout-navigation-menu';

@Component({
  selector: 'content-layout',
  styleUrls: ['content-layout.component.scss'],
  template: `
    <one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </one-column-layout>
  `,
})
export class ContentLayoutComponent {
  menu = MENU_ITEMS;
}
