import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </one-column-layout>
  `,
})
export class PagesComponent {
  menu = MENU_ITEMS;
}
